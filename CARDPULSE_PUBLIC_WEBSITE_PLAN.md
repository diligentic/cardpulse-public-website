# CardPulse Public Website Plan

## 1. Purpose

Build a public marketing website at `cardpulse.com` that explains CardPulse, demonstrates the complete scan-to-follow-up workflow, and converts visitors into Free-tier users or paid subscribers. Keep the product application and installable Progressive Web App (PWA) at `app.cardpulse.com`.

The website must position CardPulse as a follow-up product, not merely a business-card scanner.

Primary promise:

> Scan the cards you collected, check the details, and get a ready-to-review follow-up draft for each contact.

The public website must not claim that CardPulse sends email automatically. CardPulse creates drafts; the user reviews and sends them.

## 2. Launch decisions

The following decisions are fixed for the initial public launch:

- Host the public marketing website at `cardpulse.com`.
- Host the product application and PWA at `app.cardpulse.com`.
- Treat them as separate deployments with separate origin-specific configuration.
- Publish a Pricing page from day one.
- Offer a monthly subscription, not a per-event plan.
- Charge in Canadian dollars initially. We will add USD billing later.
- Offer a **Free** tier with 10 card scans.
- Launch with one paid plan at **C$13.99 per month**.
- Include **100 business-card scans per billing month**.
- Do not roll unused paid scans into the next billing month.
- Do not charge for an initial failed extraction. Charge one scan for every retry attempt and one scan for every research rerun.
- After the paid plan reaches 100 scans, stop additional scanning and direct the user to contact support for more scans.
- Allow paid subscribers to cancel at any time.
- Do not provide refunds, except where required by law.
- Display the C$13.99 price before GST and add applicable GST at checkout.
- Offer browser-based PWA installation; do not represent CardPulse as an App Store or Play Store download.
- Keep the web product fully usable in a normal browser when installation is unavailable or declined.
- CardPulse requires an internet connection. Installation does not create offline scanning, contact, or outreach functionality.

## 3. Target customer

Initial audience:

> Independent professionals and owner-operated businesses in Canada that regularly meet prospective clients, customers, or referral partners and handle their own follow-up.

Examples may include:

- Consultants and agency owners
- Realtors and mortgage brokers
- Local B2B service providers


## 4. Positioning and message hierarchy

### Primary message

Turn collected business cards into follow-ups that actually get started.

### Supporting messages

1. Process a single card or a stack of up to 10.
2. Review and correct important details before saving.
3. Create personalized follow-up drafts for Gmail.
4. Keep an accessible contact record in CardPulse, Google Sheets, CSV, or Excel.
5. Install CardPulse from the browser for convenient access from a phone or computer.

### Claims the website may make

- CardPulse supports single-card and batch scanning.
- A batch can contain up to 10 card images.
- Users can review and edit extracted details.
- CardPulse can handle duplicates by updating a contact or creating a separate one.
- Contacts can be synced to the user's Google Sheet.
- Follow-up drafts can be saved to or opened in Gmail.
- CardPulse does not retain business-card photos after the browser review step.
- CardPulse can be installed as a PWA on supported devices and browsers.
- The installed PWA requires an internet connection for product functionality.

### Claims to avoid until proven or legally approved

- "Most accurate" or "more accurate than" another product
- "No bounced emails"
- "CASL compliant" or any guarantee that an email is lawful
- Offline scanning or offline access
- Native iOS or Android app availability
- Outlook, CRM, team, event-management, badge-scanning, or other unbuilt integrations
- Invented customer counts, testimonials, ratings, or performance statistics

## 5. Domain and route structure

The architecture is fixed:

- `cardpulse.com` is the public marketing website.
- `app.cardpulse.com` is the product application and installable PWA.

The two origins should be deployed and configured independently. The marketing website must not register the product service worker or expose authenticated product functionality.

Use `https://cardpulse.com` as the canonical marketing origin and permanently redirect `https://www.cardpulse.com` to it. Do not redirect `app.cardpulse.com` through the marketing origin.

### 5.1 Marketing website: `cardpulse.com`

| URL | Purpose | Access |
|---|---|---|
| `https://cardpulse.com/` | Public marketing homepage | Public |
| `https://cardpulse.com/how-it-works` | Detailed product workflow | Public |
| `https://cardpulse.com/pricing` | Subscription offer and pricing FAQ | Public |
| `https://cardpulse.com/privacy-security` | Plain-language data and permission explanation | Public |
| `https://cardpulse.com/about` | Company and product story | Public |
| `https://cardpulse.com/contact` | Sales, support, and general enquiries | Public |
| `https://cardpulse.com/privacy` | Privacy Policy | Public |
| `https://cardpulse.com/terms` | Terms of Service and subscription terms | Public |
| `https://cardpulse.com/data-deletion` | Account and data deletion instructions | Public |

The marketing website's **Install App** links should point to `https://app.cardpulse.com/install`. A page on `cardpulse.com` cannot invoke the install prompt for the PWA on `app.cardpulse.com`, because PWA installation is tied to the app origin.

### 5.2 Product application: `app.cardpulse.com`

| URL | Purpose | Access |
|---|---|---|
| `https://app.cardpulse.com/` | Contacts dashboard | Protected |
| `https://app.cardpulse.com/scan` | Single-card scanning | Protected |
| `https://app.cardpulse.com/scan/bulk` | Batch scanning | Protected |
| `https://app.cardpulse.com/outreach` | Follow-up draft creation | Protected |
| `https://app.cardpulse.com/install` | Device-aware PWA installation page | Public |
| `https://app.cardpulse.com/login` | Sign in | Public |
| `https://app.cardpulse.com/signup` | Create account and begin subscription flow | Public |
| `https://app.cardpulse.com/forgot-password` | Request password reset | Public |
| `https://app.cardpulse.com/reset-password` | Complete password reset | Public/token-gated |

The existing application routes can remain unchanged. The public marketing site is a separate website; it does not require moving the dashboard away from `/` on the app subdomain.

### 5.3 Cross-domain rules

- Marketing **Sign In** links to `https://app.cardpulse.com/login`.
- Marketing **Start Free** and **Choose Monthly** links go to `https://app.cardpulse.com/signup`, preserve the selected tier/campaign attribution, and never trust client-provided price data.
- Marketing **Install App** links to `https://app.cardpulse.com/install`.
- Checkout success, cancellation, OAuth, password-reset, and authenticated redirects return to `app.cardpulse.com`, not `cardpulse.com`.
- Auth/session cookies should be host-only for `app.cardpulse.com` unless a documented requirement proves otherwise. Do not expose authentication cookies to the marketing origin.
- Use `Secure`, `HttpOnly`, and an appropriate `SameSite` policy for server-managed session cookies. Do not solve cross-subdomain navigation by broadening JavaScript-readable cookie scope.
- Configure OAuth authorized origins and redirect URIs for the production app origin and actual backend callback URLs.
- Configure the backend CORS allowlist for `https://app.cardpulse.com`. The marketing origin should not call authenticated product APIs.
- Keep the PWA manifest, service worker, install icons, and offline fallback on `app.cardpulse.com` only.

## 6. Global navigation and footer

### Desktop navigation

Left: CardPulse logo  
Links: **How It Works · Pricing · Install App · Privacy · About**  
Actions: **Sign In · Start Free**

`Start Free` is the primary action and links to `https://app.cardpulse.com/signup` with the Free tier selected. `Install App` is a secondary action and links to `https://app.cardpulse.com/install` for the device-aware installation experience. `Sign In` links to `https://app.cardpulse.com/login`.

### Mobile navigation

Use a compact menu with the same destinations. Keep `Start Free` visible as the primary action. Do not let the install action compete with signup on first visit.

### Footer

Include:

- Short CardPulse description
- How It Works
- Pricing
- Install App
- Privacy & Security
- About
- Contact
- Sign In
- Privacy Policy
- Terms of Service
- Data Deletion
- Copyright and company identity
- A clear note that prices are in CAD

## 7. Homepage plan

The homepage should tell one progressive story: missed follow-up, CardPulse workflow, product proof, trust, price, and next action.

### 7.1 Hero

Recommended headline:

> **Turn the cards you collect into follow-ups you'll actually send.**

Supporting copy:

> Scan your business cards, review the important details, and create a personalized follow-up draft for every contact.

Primary CTA: **Start Free**  
Secondary CTA: **See How It Works**

Supporting commercial line:

> Start with 10 card scans. Upgrade to 100 scans for C$13.99/month plus GST.


### 7.2 Problem

Show the real failure mode:

- A promising conversation happens at an event.
- The card goes into a pocket or onto a desk.
- Context fades and follow-up is delayed.
- The opportunity goes cold.

Keep this section short. Do not overstate the cost of the problem with unsupported statistics.

### 7.3 How it works

Use a four-step visual sequence:

1. **Scan** one card or a stack of up to 10.
2. **Review** extracted details and correct anything necessary.
3. **Add context** with notes about the conversation.
4. **Follow up** with a personalized draft that the user reviews and sends.

Link to `/how-it-works`.

### 7.4 Product demonstration

Show one concrete before-and-after example:

- Uploaded front/back card
- Extracted contact details
- Review/correction state
- Google Sheet or contact record
- Generated follow-up draft

Label all demo data as illustrative. Favor a short interactive or stepped demo over a carousel of generic feature cards.

### 7.5 Product benefits

Present four benefits:

- **Follow-up, not just scanning:** the workflow continues through a ready-to-review draft.
- **Process a stack:** scan up to 10 cards in one batch.
- **Review before saving:** the user stays in control of the contact record.
- **Use familiar tools:** connect Google Sheets and Gmail, or export CSV/Excel.

### 7.6 Audience

Recommended copy direction:

> Built for professionals whose next client, customer, or referral may begin with a conversation and a business card.

Illustrate the selected launch segment first. Do not create the impression that specialized workflows exist for every listed profession.

### 7.7 Privacy and control

Explain:

- Card photos are used during processing and review but are not stored by CardPulse.
- Users review details before saving.
- Contacts can be placed in the user's Google Sheet.
- Drafts go to or open in the user's Gmail.
- The user decides whether and when to send a message.

Link to `/privacy-security` and the formal Privacy Policy.

### 7.8 Install CardPulse

Use a device mockup and a short value statement:

> **Keep CardPulse one tap away.** Install it from your browser for an app-like window and a home-screen or desktop icon.

Behavior:

- If a direct browser install prompt is available, show **Install App**.
- On iPhone/iPad or where direct prompting is unavailable, show **How to Install**.
- If CardPulse is already running in standalone mode, replace the action with **Open CardPulse** or hide the install promotion.

Always include:

> Internet connection required. CardPulse is not currently distributed through the Apple App Store or Google Play Store.

Link to `https://app.cardpulse.com/install` for the actual install prompt and full instructions.

### 7.9 Pricing preview

Show two compact pricing cards:

> **Free**  
> **C$0**  
> 10 business-card scans.

> **CardPulse Monthly**  
> **C$13.99/month**  
> 100 business-card scans per billing month, automatic research, follow-up drafts, Google integrations, and exports.

CTAs: **View Pricing**, **Start Free**, and **Choose Monthly**, with signup actions linking to `https://app.cardpulse.com/signup` and preserving the selected tier.

Add:

> Paid plan billed monthly in Canadian dollars. C$13.99 excludes GST. No scan rollover.

Do not add a monthly/annual toggle, more tiers, a per-event option, or a disabled USD control.

### 7.10 FAQ

The homepage FAQ should answer the six strongest objections:

1. Does CardPulse send emails automatically?
2. Are card photos retained?
3. Can I scan several cards at once?
4. Does CardPulse work with Outlook?
5. Can I install CardPulse on my phone?
6. Does the installed app work offline?

Link to the relevant detailed pages where appropriate.

### 7.11 Final CTA

Recommended copy:

> **Don't let your next stack of business cards go cold.**

Primary CTA: **Start Free**  
Secondary CTA: **Get 100 Scans for C$13.99/month**

## 8. How It Works page

Explain the complete product journey with screenshots or short demonstrations.

Sections:

1. Capture a card with the camera or upload images.
2. Add a back image when needed.
3. Process one card or a batch of up to 10.
4. Review extracted details, QR information, and multiple people where present.
5. Correct details and add notes.
6. Review duplicate-contact choices.
7. Save to CardPulse and optionally Google Sheets.
8. Generate a personalized follow-up draft.
9. Save to or open in Gmail.
10. Review and send the message yourself.
11. Export contacts to CSV or Excel when needed.

Include a prominent clarification:

> CardPulse creates drafts. It never sends email automatically.

End with a Pricing link on `cardpulse.com` and a signup CTA to `https://app.cardpulse.com/signup`.

## 9. Pricing page

### 9.1 Pricing hero

Headline:

> **Simple pricing for better networking follow-up.**

Supporting copy:

> Scan the cards you collect, review the details, and prepare personal follow-up drafts without adopting a complicated CRM.

### 9.2 Launch plans

Present the Free tier first and visually recommend CardPulse Monthly for regular networkers.

#### Free

**C$0**

Includes:

- 10 business-card scans
- Browser and installable PWA access

CTA: **Start Free**, linking to `https://app.cardpulse.com/signup` with the Free tier selected.

The team must still decide whether the 10 scans are a one-time account allowance or reset on a schedule, and which paid-plan features are available on Free. Do not publish a reset period, feature parity, or payment-card requirement until those rules are implemented.

#### CardPulse Monthly

**C$13.99/month, excluding GST**

Includes:

- 100 business-card scans per billing month
- Single-card scanning
- Batch scanning of up to 10 card images at a time
- Contact review and correction
- Duplicate-contact handling
- Personalized AI follow-up drafts
- Gmail integration
- Google Sheets sync
- CSV and Excel export
- Installable PWA access

CTA: **Choose Monthly**, linking to `https://app.cardpulse.com/signup` with the Monthly tier selected.

Required notes:

> Billed monthly in Canadian dollars. GST is additional. Cancel anytime. No refunds except where required by law. Unused scans do not roll over.

"Cancel anytime" may be published only when self-service cancellation is implemented. The Terms and account UI must state whether cancellation takes effect immediately or at the end of the current paid billing period.

### 9.3 What counts as a scan

Publish a precise definition that matches billing enforcement:

- One business card counts as one scan.
- Front and back images belonging to the same card count as one scan.
- A batch of 10 cards uses 10 scans.
- An initial failed extraction does not consume a scan.
- Every retry attempt consumes one scan, even if the original extraction failed.
- Every manual research rerun consumes one scan.
- Unused paid-plan scans expire at the end of the billing month and do not roll over.
- At 100 scans, additional scanning is blocked and the user is directed to contact support.
- Additional scans are not sold through self-service checkout at launch; support handles requests.

The product must show the remaining allowance and display the scan cost before a user confirms a retry or research rerun. Usage enforcement must be atomic so concurrent requests cannot exceed the allowance.

### 9.4 Pricing FAQ

Include:

- What happens after I use 100 scans?
- Do unused scans roll over?
- Does scanning the back of a card count twice?
- How does the Free tier work?
- When do the 10 Free scans reset, if at all?
- Does a failed scan use my allowance?
- Does retrying or rerunning research use my allowance?
- Can I purchase more scans?
- Can I cancel online?
- Are taxes included?
- Which payment methods are accepted?
- Is the price in Canadian dollars?
- What happens to my contacts after cancellation?

### 9.5 Checkout disclosure

Before payment, show:

- C$13.99 recurring monthly charge
- Billing frequency
- Included scan allowance
- "Excludes GST" and the applicable GST amount before final confirmation
- Renewal date or renewal rule
- Cancellation method
- Cancellation effective date and resulting loss-of-access date
- No-refund policy, except where required by law
- No-rollover policy
- Link to Terms and Privacy Policy

The Free tier is a plan, not a time-limited free trial. Do not call it a trial unless a separate trial is introduced later.

## 10. Install App page and PWA experience

### 10.1 Purpose

The real installation page must live at `https://app.cardpulse.com/install`, on the same origin as the product manifest and service worker. `cardpulse.com` may explain that CardPulse is installable, but its install actions must navigate to the app origin before attempting installation.

The installation experience must progressively enhance the website:

- Use a direct install prompt when the browser exposes one.
- Otherwise provide accurate platform-specific instructions.
- Keep the product usable in the browser in every case.
- Never imply that installation comes from an app store.

### 10.2 Entry points

Provide installation access from:

- Marketing navigation: **Install App**, linking to `https://app.cardpulse.com/install`
- Marketing homepage install section, linking to `https://app.cardpulse.com/install`
- Signed-in account/navigation menu
- A contextual prompt after the user completes a meaningful action, such as their first successful scan
- The public `https://app.cardpulse.com/install` route

Do not show aggressive install prompts immediately on first page load. Purchase/signup remains the primary marketing action.

### 10.3 Platform-specific fallbacks

#### iPhone and iPad

Recommended instructions:

1. Open CardPulse in Safari.
2. Tap the Share button.
3. Choose **Add to Home Screen**.
4. Turn on **Open as Web App** when the option is shown.
5. Tap **Add**.

Use current annotated screenshots and update them when the supported iOS UI changes.

#### Android

If the direct install prompt is available, show **Install App**. Otherwise instruct the user to open the browser menu and choose **Install app** or **Add to Home screen**, using wording appropriate to the detected browser.

#### Windows, macOS, ChromeOS, and Linux

If the direct prompt is available, use it. Otherwise instruct users to use the install control in the address bar or the browser's install/add-to-dock command. Provide separate Chrome/Edge and Safari instructions rather than one universal path.

#### Unsupported or unknown browser

Show:

> CardPulse still works in this browser. For the most reliable installation experience, open this page in a supported browser or follow your browser's “install app” or “add to home screen” option.

Never block access because installation is unavailable.


### 10.4 PWA acceptance criteria

- Eligible Chromium browsers show the custom **Install App** button only after `beforeinstallprompt` fires.
- Clicking the button opens the browser-controlled confirmation prompt.
- Dismissing the prompt does not trap or repeatedly nag the user.
- Installed mode hides install promotions.
- The installed icon launches CardPulse at `https://app.cardpulse.com/` in standalone mode.
- Signed-out installed users reach a valid sign-in flow and return to the app dashboard afterward.
- iPhone/iPad users receive accurate manual instructions.
- Unsupported browsers receive instructions without losing normal website access.
- The install page clearly says that an internet connection is required.
- The install flow works over HTTPS in production.
- Lighthouse/browser installability checks pass on the production build where applicable.
- Installation is tested on at least Chrome Android, Safari iPhone, Chrome/Edge desktop, and Safari macOS.

## 11. Privacy & Security page

Cover:

- What data is collected
- Why each Google permission is requested
- Where contact records are stored
- What is sent to AI
- The fact that CardPulse does not retain card photos
- How users disconnect Google services
- How users request account/data deletion
- The distinction between CardPulse contacts, Google Sheets, and Gmail data
- A link to the formal Privacy Policy

Do not promise data residency, retention periods, or regulatory compliance until verified and reflected in the legal documents and implementation.

## 12. About page

Keep this page brief and credible:

- The networking follow-up problem CardPulse is solving
- Why the product continues beyond scanning
- The company/team behind CardPulse
- The Canadian launch focus
- Contact information

Do not describe local support, partnerships, customer adoption, or community endorsement without evidence.

## 13. Contact page

Provide a simple form with:

- Name
- Email
- Topic: Sales, Support, Billing, Privacy, Partnership, Other
- Message
- Consent/Privacy Policy acknowledgement where required

Show an expected response window only if the team can consistently meet it. Protect the form with validation, rate limiting, and spam controls.

## 14. Conversion flow

Recommended conversion paths:

```text
cardpulse.com marketing page
    -> Start Free or Choose Monthly
    -> app.cardpulse.com/signup
    -> Create account / sign in on the app origin
    -> Free: activate the 10-scan Free tier
    -> Monthly: confirm C$13.99/month plus GST and terms
                -> Stripe-hosted or secure checkout
                -> Payment success
    -> Return to app.cardpulse.com for product onboarding
    -> First scan
    -> Contextual install suggestion
```

Installation must not be required before signup or payment. A user may install before or after subscribing, but protected features still require a valid account and subscription.

Preserve approved campaign attribution when moving from `cardpulse.com` to `app.cardpulse.com`, but never accept a client-provided amount or price identifier as authoritative. The server must select the approved Stripe price.

Define how authentication and checkout recovery work if the browser reloads, OAuth changes the tab, payment is cancelled, or the user opens the installed PWA midway through onboarding. All authenticated recovery destinations belong on `app.cardpulse.com`.

## 15. Content and design direction

### Voice

- Clear and practical
- Professional without enterprise jargon
- Focused on follow-up outcomes
- Honest about user control and product limits

### Visual direction

- Lead with the real product interface rather than stock networking photos.
- Use close-up product states to explain scanning, review, and drafting.
- Use one strong narrative composition instead of repeated generic feature-card grids.
- Ensure mobile layouts work well because scanning and installation are important mobile journeys.
- Clearly label illustrative contact data.

### Accessibility

- Meet WCAG 2.2 AA as the implementation target.
- Support keyboard navigation and visible focus states.
- Use semantic headings and landmarks.
- Give controls accessible names and minimum usable touch targets.
- Provide alt text for meaningful product imagery.
- Respect reduced-motion preferences.
- Do not rely on colour alone for confidence, status, price, or errors.
- Make install modals and menus focus-managed and screen-reader friendly.

## 16. SEO and sharing

Each public page needs:

- Unique title and meta description
- Canonical URL
- Open Graph title, description, and image
- Appropriate robots behavior
- Descriptive headings and internal links

Initial search themes:

- Business card scanner with follow-up
- Business card scanner Canada
- Scan business cards to Google Sheets
- Business card scanner for Gmail follow-up
- Batch business card scanner

Add structured data only where it accurately represents the content. Pricing/product structured data must match the visible C$0 Free tier and C$13.99 CAD Monthly offer, including that GST is additional where the schema supports it without ambiguity.

All public marketing pages on `cardpulse.com` should use the marketing sitemap and intended indexing rules. The entire `app.cardpulse.com` origin—including install, authentication, callback, checkout-result, account, and product pages—should default to `noindex` and should not appear in the marketing XML sitemap.

## 17. Analytics

Track the funnel without recording contact/card contents:

- Homepage viewed
- How It Works viewed
- Pricing viewed
- Start Free clicked
- Choose Monthly clicked
- Signup started/completed
- Checkout started/completed/cancelled
- Install page viewed
- Direct install prompt shown
- Install accepted/dismissed
- Manual install instructions viewed by platform
- App launched in standalone mode
- First successful scan

Use either separate analytics properties/streams for `cardpulse.com` and `app.cardpulse.com`, or an explicitly configured cross-domain setup. Preserve only the minimum attribution needed for funnel reporting. Do not share authentication cookies with the marketing site, and do not place email addresses or other user identifiers in cross-domain query parameters.

Never place extracted names, emails, phone numbers, card images, notes, draft bodies, or other user contact data into analytics events.

Consent and cookie behavior must match the chosen analytics provider and legal requirements.

## 18. Legal and policy dependencies

Before accepting payment, complete and publish:

- Privacy Policy
- Terms of Service
- Subscription, renewal, cancellation, and refund terms
- Data deletion process
- The exact post-cancellation retention period
- Company legal identity and support contact details

The subscription and data lifecycle must follow these approved rules:

- Subscribers may cancel at any time.
- Once cancellation becomes effective, the former subscriber cannot access or export contacts.
- The cancellation flow must warn the user to export needed data before the effective cancellation time.
- CardPulse automatically deletes the account's stored data after a fixed post-cancellation retention period.
- The exact retention period remains TBD and must be implemented, stated in the cancellation flow, Terms, Privacy Policy, and data-deletion documentation before paid launch.
- Payments are non-refundable except where required by law.
- C$13.99 excludes GST; the applicable GST is added at checkout.

Before making public privacy or outreach claims, complete the planned Canadian privacy/CASL legal review. CardPulse should say that users decide whether they may contact someone; it should not promise legal compliance.

## 19. Confirmed policies and remaining decisions

### 19.1 Confirmed

| Topic | Launch policy |
|---|---|
| Free access | Free tier with 10 card scans; it is not described as a free trial |
| Paid plan | C$13.99 per month for 100 scans |
| Failed extraction | Initial failed extraction does not consume a scan |
| Extraction retry | Every retry attempt consumes one scan |
| Research rerun | Every rerun consumes one scan |
| Rollover | No rollover |
| Paid allowance exhausted | Block further scanning and direct the user to support |
| Additional scans | Contact support; no self-service add-on at launch |
| Cancellation | User can cancel at any time |
| Refunds | No refunds, except where required by law |
| Tax | Display price excluding GST; add applicable GST at checkout |
| Access after effective cancellation | No product access or contact export |
| Post-cancellation data | Automatically delete after the published retention period |
| Draft generation | No limit has been approved yet |

### 19.2 Still required before final copy or paid launch

1. Decide whether the 10 Free scans are lifetime or reset on a defined schedule.
2. Decide which features are included in Free beyond scanning/PWA access.
3. Decide whether Free requires a payment card.
4. Confirm that reaching 10 Free scans blocks scanning and presents an upgrade to CardPulse Monthly.
5. Decide whether paid cancellation is immediate or effective at the end of the current billing period.
6. Set the fixed post-cancellation data-retention period.
7. Decide whether follow-up draft generation is unlimited or receives a usage limit.
8. Supply the exact legal company identity and support contact for the footer, checkout, legal pages, deletion requests, and scan-limit requests.

Engineering must not infer these remaining rules. Product must approve them, and the billing implementation, product UI, website, Privacy Policy, and Terms must use the same definitions.

## 20. Implementation phases

### Phase 1: Foundations

- Provision `cardpulse.com` for the separate marketing deployment and `app.cardpulse.com` for the existing product deployment.
- Keep the existing product routes on the app subdomain and ensure the app dashboard remains at `/` there.
- Configure DNS, TLS, environment variables, allowed origins, canonical URLs, and deployment ownership for both hosts.
- Update marketing links, app redirects, OAuth callbacks, checkout return URLs, password-reset URLs, and tests for the production origins.
- Keep app session cookies scoped to the app host and verify backend CORS permits the app origin.
- Finalize the remaining Free-tier, cancellation-timing, retention, draft-limit, and company/support decisions.
- Implement plan entitlements and atomic scan metering for the 10-scan Free tier and 100-scan Monthly tier.
- Implement the approved failed-extraction, retry, research-rerun, no-rollover, and exhausted-allowance rules.
- Implement Stripe subscription state, GST handling, and paid entitlement enforcement.
- Verify the PWA manifest, service worker, and install assets are served only by `app.cardpulse.com` and launch its `/` route.

### Phase 2: Public website

- Build the separate `cardpulse.com` project/deployment and its global header/footer.
- Build Home, How It Works, Pricing, Privacy & Security, About, and Contact on the marketing origin.
- Make marketing Install App links open `https://app.cardpulse.com/install`; do not implement a second PWA on the marketing origin.
- Add Privacy Policy, Terms, and Data Deletion pages.
- Add responsive product demonstrations and final approved copy.
- Add SEO metadata and sharing images.

### Phase 3: Installation experience

- Add the public `/install` route to `app.cardpulse.com` and implement the direct-install controller there.
- Add device-aware fallback instructions.
- Add installed-mode detection and post-first-scan promotion.
- Verify standalone authentication, navigation, and OAuth.
- Test install behavior across the supported platform matrix.

### Phase 4: Checkout and onboarding

- Connect Free signup, paid checkout, billing success, subscription status, and account management.
- Add remaining-allowance visibility and clear retry/rerun cost disclosures inside the product.
- Block paid scanning at 100 scans and provide the approved support contact path.
- Add self-service cancellation, pre-cancellation export warning, post-cancellation access blocking, and scheduled deletion after the approved retention period.

### Phase 5: Quality and launch

- Run responsive, accessibility, browser, and PWA checks.
- Verify every marketing claim against the production product.
- Test the full signup/payment/scan/install journey.
- Verify analytics contains no contact data.
- Complete privacy/security and legal review.
- Launch with CAD pricing only.

## 21. Definition of done

The public website is ready when:

- `https://cardpulse.com/` serves the public marketing website.
- `https://app.cardpulse.com/` serves the existing protected product dashboard.
- Marketing Sign In, Start Free, Choose Monthly, and Install App links reach the correct app-subdomain destinations.
- All primary public pages are complete and responsive.
- The 10-scan Free tier and C$13.99 monthly/100-scan paid tier are consistently defined across pricing, signup, checkout, product UI, metering, and legal terms.
- Failed extractions, retries, research reruns, rollover, allowance exhaustion, cancellation, refunds, GST, and post-cancellation data handling match the approved policies.
- Users can create an account, pay, and enter the product without manual intervention.
- Supported browsers can invoke the direct PWA install prompt from `app.cardpulse.com`.
- Other users receive accurate platform-specific installation instructions.
- Installed CardPulse launches `app.cardpulse.com`, never the marketing homepage.
- The site does not imply native-app-store distribution or offline product support.
- Authentication, Google connections, and scanning work in both browser and standalone modes.
- Public claims have been verified against the production implementation.
- Legal documents and data-deletion instructions are live.
- Accessibility, SEO, analytics, security, billing, and cross-browser checks pass.

## 22. Later additions

Consider only after the launch offer and customer evidence are established:

- USD billing and currency selection
- Annual subscriptions
- Additional plan tiers or scan add-ons
- Accuracy report based on a documented test
- Customer stories and testimonials
- Segment-specific use-case pages
- Product changelog and educational resources
- App-store packaging/distribution
- Outlook or CRM integrations
- Team and event workflows

Do not advertise these as available until they are implemented and approved.

## 23. Reference notes for developers

The installation approach follows current platform guidance:

- MDN, "Making PWAs installable": https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
- MDN, "Trigger installation from your PWA": https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt
- Apple Support, "Turn a website into an app in Safari on iPhone": https://support.apple.com/en-az/guide/iphone/iphea86e5236/26/ios

Browser installation behavior changes over time. Verify the final instructions on the supported OS/browser versions immediately before release.
