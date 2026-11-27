// Text mirrors legal/*.md. Update both together.
export function PrivacyPolicy() {
  return (
    <div className="prose">
      <p>{"Effective date: November 27, 2026"}</p>
      <p>{"Dovvy is operated by Diligentic Infotech Canada Inc. (\"we\", \"us\"). Dovvy turns business cards into contact records and helps you prepare follow-up emails. This policy explains what we collect, how we use and share it, and your choices."}</p>
      <p>{"Privacy Officer: Ajay Kumar, "}<a href="mailto:ajay@diligentic.com">ajay@diligentic.com</a></p>
      <h2>{"1. Information we collect"}</h2>
      <p><strong>{"Account information."}</strong>{" Name, username, email address, password (stored as a hash), profile settings, and session information such as IP address and browser type."}</p>
      <p><strong>{"Business card and contact information."}</strong>{" Card images you capture or upload, text and QR data extracted from them, names, job titles, companies, email addresses, phone numbers, websites, addresses, links, notes you write, and AI-generated company and person summaries."}</p>
      <p><strong>{"Outreach information."}</strong>{" Email drafts, subjects, recipient names and addresses, and draft status."}</p>
      <p><strong>{"Billing information."}</strong>{" Subscription status, usage counts, and invoice references. Stripe collects and processes your payment card details. We do not store full card numbers."}</p>
      <p><strong>{"Support enquiries."}</strong>{" Your name, email, topic, and message."}</p>
      <h2>{"2. How we use information"}</h2>
      <p>{"We use it to provide the service you ask for: reading cards, saving and exporting contacts, researching contacts, writing drafts, syncing with Google, managing your account and subscription, sending account emails, providing support, preventing abuse, and meeting legal obligations."}</p>
      <p>{"We do not sell personal information and we do not use it for advertising."}</p>
      <h2>{"3. Card images and AI processing"}</h2>
      <p>{"Card images are processed to extract their contents. We do not store card images on our servers after processing."}</p>
      <p>{"We use Google's Gemini API to read cards, summarize company websites, generate company and person summaries and suggested profile links, and write drafts. The content needed for each task is sent to Google. If a contact has a website, our server may retrieve its public text to identify the services listed."}</p>
      <p>{"AI output can be wrong or incomplete. Review it before you rely on it."}</p>
      <h2>{"4. Google user data"}</h2>
      <p>{"Connecting Google is optional apart from the sign-in method you choose. We request only these permissions:"}</p>
      <table className="scan-table"><thead><tr><th scope="col">{"Permission"}</th><th scope="col">{"What Dovvy does with it"}</th></tr></thead><tbody><tr><td>{"openid, userinfo.email, userinfo.profile"}</td><td>{"Signs you in and identifies your account using your name, email address, profile information, and Google account identifier."}</td></tr><tr><td>{"drive.file"}</td><td>{"Creates a spreadsheet for your contacts, or works with a file you have made available to Dovvy. Dovvy reads rows to display contacts, check for duplicates and maintain headers, and writes contact rows and formatting. It cannot see your other Drive files."}</td></tr><tr><td>{"gmail.compose (restricted)"}</td><td>{"Creates drafts in your Gmail account when you ask. Dovvy does not read your inbox or messages, and does not send email. This permission technically allows sending; Dovvy does not use it for that."}</td></tr></tbody></table>
      <p><strong>{"Storage and protection."}</strong>{" We store Google authorization tokens, the permissions you granted, and the ID, address, and name of your linked spreadsheet. Data is encrypted in transit. Refresh tokens are encrypted at rest."}</p>
      <p><strong>{"Sharing."}</strong>{" We do not transfer Google user data to others except as needed to provide the features you use (including our hosting providers), to comply with law, for security purposes, or as part of a merger or sale with your consent."}</p>
      <p><strong>{"Limited Use."}</strong>{" Dovvy's use and transfer of information received from Google APIs to any other app will adhere to the "}<a href="https://developers.google.com/terms/api-services-user-data-policy">{"Google API Services User Data Policy"}</a>{", including the Limited Use requirements."}</p>
      <p>{"In particular, we do not use Google user data for advertising, we do not sell it, and we do not use Google Workspace data to develop, improve, or train generalized AI or machine learning models. People do not read it unless you give permission for specific data, it is necessary for security or to comply with law, or it is aggregated and anonymized for internal operations."}</p>
      <p><strong>{"Removing access."}</strong>{" You can revoke Dovvy at "}<a href="https://myaccount.google.com/permissions">{"https://myaccount.google.com/permissions"}</a>{". To have stored tokens and related data deleted, email "}<a href="mailto:ajay@diligentic.com">ajay@diligentic.com</a>{". Spreadsheets and drafts already in your Google account stay there until you delete them."}</p>
      <h2>{"5. Who we share information with"}</h2>
      <table className="scan-table"><thead><tr><th scope="col">{"Provider"}</th><th scope="col">{"Purpose"}</th></tr></thead><tbody><tr><td>{"Google"}</td><td>{"Sign-in, Sheets and Gmail features, Gemini AI processing"}</td></tr><tr><td>{"Stripe"}</td><td>{"Payments and subscriptions"}</td></tr><tr><td>{"Brevo"}</td><td>{"Account and security emails"}</td></tr><tr><td>{"Cloud hosting providers"}</td><td>{"Running the website, application, and database"}</td></tr></tbody></table>
      <p>{"We may also disclose information when the law requires it, to protect rights and safety, or in a business sale or reorganization, subject to applicable law."}</p>
      <p>{"Some providers process information outside Canada, including in the United States, where it may be accessible to courts and authorities there."}</p>
      <h2>{"6. Retention and deletion"}</h2>
      <p>{"We keep account and contact data while your account is open. If you ask us to delete your account, we delete it within 30 days. Copies in backups and logs are removed as they expire on a rolling schedule. We may keep limited billing and legal records for as long as the law requires."}</p>
      <p>{"To request deletion, email "}<a href="mailto:ajay@diligentic.com">ajay@diligentic.com</a>{" from your account address. Cancelling a paid plan does not delete your account."}</p>
      <h2>{"7. Security"}</h2>
      <p>{"We use safeguards such as encryption in transit, password hashing, and access controls. No system is completely secure. If a breach creates a real risk of significant harm, we will notify affected people and regulators as the law requires."}</p>
      <h2>{"8. Browser storage"}</h2>
      <p>{"We use cookies and browser storage to keep you signed in, complete Google sign-in, and remember preferences. We do not use advertising or third-party analytics trackers."}</p>
      <h2>{"9. Your rights"}</h2>
      <p>{"You may ask to access, correct, export, or delete your personal information, or withdraw consent. Email "}<a href="mailto:ajay@diligentic.com">ajay@diligentic.com</a>{". We respond within the time the law requires. You may also complain to the Office of the Information and Privacy Commissioner of Alberta or the Office of the Privacy Commissioner of Canada."}</p>
      <h2>{"10. People whose cards are scanned"}</h2>
      <p>{"If a Dovvy user saved your details and you want them accessed, corrected, or deleted, email "}<a href="mailto:ajay@diligentic.com">ajay@diligentic.com</a>{". Users are responsible for having a lawful reason to collect and use their contacts' information."}</p>
      <h2>{"11. Children"}</h2>
      <p>{"Dovvy is for people aged 18 or older."}</p>
      <h2>{"12. Changes"}</h2>
      <p>{"We will post updates here and change the effective date. We will notify you of significant changes, and get consent where required, including before using Google user data in a new way."}</p>
    </div>
  );
}
export function TermsOfService() {
  return (
    <div className="prose">
      <p>{"Effective date: November 27, 2026"}</p>
      <p>{"These terms are an agreement between you and Diligentic Infotech Canada Inc. (\"we\", \"us\"), for your use of Dovvy. By creating an account or using Dovvy, you agree to them. If you use Dovvy for a business, you confirm you can bind it."}</p>
      <h2>{"1. The service"}</h2>
      <p>{"Dovvy reads business cards, stores contact records, exports and syncs contacts, and helps you draft follow-up emails. It needs an internet connection. Features may change."}</p>
      <h2>{"2. Your account"}</h2>
      <p>{"You must be at least 18. Give accurate information, keep your credentials secure, and tell us promptly about unauthorized use. You are responsible for activity under your account."}</p>
      <h2>{"3. Plans, billing, and cancellation"}</h2>
      <ul><li>{"Dovvy offers a Free plan and a paid monthly plan. Prices, scan and draft allowances, and recipient limits are those shown on the pricing page and at checkout when you buy."}</li><li>{"The paid plan renews monthly until cancelled. Prices are in Canadian dollars; GST and other applicable taxes are extra."}</li><li>{"Payments are processed by Stripe."}</li><li>{"You can cancel at any time through the billing portal. Cancellation takes effect at the end of the current billing period, after which your account moves to the Free plan."}</li><li>{"Unused allowances do not roll over."}</li><li>{"Payments are non-refundable except where the law requires otherwise."}</li><li>{"We will give at least 30 days' notice of a price increase."}</li></ul>
      <h2>{"4. Your content and responsibilities"}</h2>
      <p>{"You keep your rights in the content you provide. You allow us to host and process it only to run, secure, and support Dovvy."}</p>
      <p>{"You confirm that you have the right to collect and use the contact information you add. You are responsible for complying with privacy and anti-spam laws, including Canada's Anti-Spam Legislation (CASL): having consent where required, identifying yourself, and honouring unsubscribe requests. Dovvy does not make your outreach compliant."}</p>
      <h2>{"5. AI features"}</h2>
      <p>{"Extracted details, summaries, suggested profiles, and drafts are generated automatically and may be inaccurate. Check them before saving or sending. You decide what to send and to whom."}</p>
      <h2>{"6. Acceptable use"}</h2>
      <p>{"Do not use Dovvy to break the law, send spam or harassing messages, collect information without a lawful basis, upload malicious files or sensitive data such as government ID or payment card numbers, bypass limits or security, scrape or reverse engineer the service except as law permits, or resell it without our written permission."}</p>
      <h2>{"7. Google and other third-party services"}</h2>
      <p>{"Google connections are optional and subject to Google's terms. Our handling of Google data is described in the "}<a href="https://dovvy.ca/privacy">{"Privacy Policy"}</a>{". We are not responsible for third-party services."}</p>
      <h2>{"8. Our property"}</h2>
      <p>{"Dovvy, including its software and branding, belongs to us or our licensors. We give you a limited, non-exclusive, non-transferable right to use it under these terms."}</p>
      <h2>{"9. Suspension and termination"}</h2>
      <p>{"You may stop using Dovvy at any time and ask us to delete your account. We may suspend or end access if you breach these terms, create legal or security risk, or fail to pay. Where reasonable, we will give notice and a chance to export your contacts."}</p>
      <p>{"If we discontinue Dovvy, we will give at least 30 days' notice and refund any prepaid amount for the unused period."}</p>
      <h2>{"10. Disclaimers"}</h2>
      <p>{"To the extent the law allows, Dovvy is provided \"as is\" and \"as available\", without warranties of any kind, including fitness for a particular purpose, accuracy, or uninterrupted operation."}</p>
      <h2>{"11. Limitation of liability"}</h2>
      <p>{"To the extent the law allows, we are not liable for indirect, special, incidental, or consequential damages, or lost profits, revenue, data, or opportunities. Our total liability for all claims is limited to the greater of the amount you paid us in the 12 months before the event and C$100."}</p>
      <h2>{"12. Indemnity"}</h2>
      <p>{"If you use Dovvy for business, you will indemnify us against third-party claims arising from your content, your outreach, or your breach of these terms or the law."}</p>
      <h2>{"13. Governing law"}</h2>
      <p>{"The laws of Alberta and the federal laws of Canada that apply there govern these terms. The courts of Alberta have jurisdiction. This does not remove consumer protections that cannot be waived where you live."}</p>
      <h2>{"14. General"}</h2>
      <p>{"If part of these terms is unenforceable, the rest remains in effect. These terms and the Privacy Policy are the whole agreement. We may update these terms and will give notice of material changes. Continued use after the effective date means you accept them."}</p>
      <h2>{"15. Contact"}</h2>
      <p>{"Ajay Kumar, "}<a href="mailto:ajay@diligentic.com">ajay@diligentic.com</a></p>
    </div>
  );
}
