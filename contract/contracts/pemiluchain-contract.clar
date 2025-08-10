(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard.sip-010-trait)

;; Governance token definition
(define-fungible-token gov-token)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-proposal-not-found (err u101))
(define-constant err-already-voted (err u102))
(define-constant err-voting-closed (err u103))
(define-constant err-already-has-token (err u104))
(define-constant err-no-token (err u105))
(define-constant err-not-eligible (err u106))

;; Token metadata
(define-constant token-name "Pemilihan Umum Token")
(define-constant token-symbol "PUT")
(define-constant token-decimals u0) ;; no decimals, only whole tokens

;; Track how many proposals have been created
(define-data-var proposal-count uint u0)

;; Track whether an address currently holds the voting token
(define-map has-token principal bool)

;; Proposal storage
(define-map proposals uint {
  title: (string-ascii 64),
  description: (string-ascii 256),
  end-block: uint,
  yes-votes: uint,
  no-votes: uint,
  executed: bool
})

;; Voting records
(define-map votes { proposal-id: uint, voter: principal } bool)

;; SIP-010 Required Read-Only Functions
(define-read-only (get-name) (ok token-name))
(define-read-only (get-symbol) (ok token-symbol))
(define-read-only (get-decimals) (ok token-decimals))
(define-read-only (get-balance (user principal)) (ok (ft-get-balance gov-token user)))
(define-read-only (get-total-supply) (ok (ft-get-supply gov-token)))
(define-read-only (get-token-uri) (ok none))

;; Transfers disabled no trading allowed
(define-public (transfer (amount uint) (from principal) (to principal) (memo (optional (buff 34))))
  (err u107) ;; Transfers not allowed
)

;; Mint exactly 1 token to a user owner only
(define-public (mint-one (to principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (is-none (map-get? has-token to)) err-already-has-token)

    ;; Make sure minting succeeds
    (unwrap! (ft-mint? gov-token u1 to) (err u108))

    ;; Record that this principal now holds the token
    (map-set has-token to true)

    (ok true)
  )
)


;; Create proposal
(define-public (create-proposal (title (string-ascii 64)) (description (string-ascii 256)) (duration uint))
  (let
    (
      (proposal-id (+ (var-get proposal-count) u1))
      (end-block (+ block-height duration))
    )
    (map-set proposals proposal-id {
      title: title,
      description: description,
      end-block: end-block,
      yes-votes: u0,
      no-votes: u0,
      executed: false
    })
    (var-set proposal-count proposal-id)
    (ok proposal-id)
  )
)

(define-public (vote (proposal-id uint) (support bool))
  (let
    (
      (proposal (unwrap! (map-get? proposals proposal-id) err-proposal-not-found))
      (voting-power (ft-get-balance gov-token tx-sender))
      (vote-key { proposal-id: proposal-id, voter: tx-sender })
    )
    ;; Voting open?
    (asserts! (< block-height (get end-block proposal)) err-voting-closed)
    ;; Hasn't voted yet?
    (asserts! (is-none (map-get? votes vote-key)) err-already-voted)
    ;; Must have exactly 1 token
    (asserts! (is-eq voting-power u1) err-no-token)

    ;; Record vote
    (asserts! (map-set votes vote-key true) (err u110))

    ;; Update proposal tally
    (if support
      (asserts!
        (map-set proposals proposal-id (merge proposal { yes-votes: (+ (get yes-votes proposal) u1) }))
        (err u111)
      )
      (asserts!
        (map-set proposals proposal-id (merge proposal { no-votes: (+ (get no-votes proposal) u1) }))
        (err u112)
      )
    )

    ;; Burn token after voting
    (unwrap! (ft-burn? gov-token u1 tx-sender) (err u113))

    ;; Remove from has-token map
    (asserts! (map-delete has-token tx-sender) (err u114))

    (ok true)
  )
)


;; Execute proposal if it passed
(define-public (execute-proposal (proposal-id uint))
  (let
    (
      (proposal (unwrap! (map-get? proposals proposal-id) err-proposal-not-found))
    )
    (asserts! (>= block-height (get end-block proposal)) err-voting-closed)
    (asserts! (not (get executed proposal)) err-already-voted)
    (asserts! (> (get yes-votes proposal) (get no-votes proposal)) err-not-eligible)
    (map-set proposals proposal-id (merge proposal { executed: true }))
    (ok true)
  )
)

;; Read-only functions
(define-read-only (get-proposal (proposal-id uint)) (map-get? proposals proposal-id))
(define-read-only (get-user-vote (proposal-id uint) (voter principal)) (map-get? votes { proposal-id: proposal-id, voter: voter }))
(define-read-only (get-proposal-count) (var-get proposal-count))
