import React from 'react';
import { heroStyles } from '../assets/dummyStyles';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';


const Hero = () => {

  const navigate = useNavigate();
  const clerk = useClerk();

  const handleSignedInPrimary = () => {
    navigate('/app/create-invoice');
  };
  const handleSignedOutPrimary = () => {
    try {
      if (clerk && typeof clerk.openSignUp === 'function') {
        clerk.openSignUp();
      }
    } catch (err) {
      console.error('Failed to open clerk sign-up modal:', err);
    }
  }

  return (
    <section className={heroStyles.section}>
      <div className={heroStyles.bgElement1}></div>
      <div className={heroStyles.bgElement2}></div>
      <div className={heroStyles.bgElement3}></div>

      <div className={heroStyles.gridPattern}></div>
      <div className={heroStyles.container}>
        <div className={heroStyles.grid}>
          <div className={heroStyles.content}>
            <div className={heroStyles.contentInner}>
              <div className={heroStyles.badge}>
                <div className={heroStyles.badgeDot}></div>
                <span className={heroStyles.badgeText}>AI-Powered Invoicing platform</span>
              </div>
              {/* main heading */}
              <h1 className={heroStyles.heading}>
                <span className={heroStyles.headingLine1}>Professional</span>
                <br />
                <span className={heroStyles.headingLine2}>Invoices</span>
                <br />
                <span className={heroStyles.headingLine3}>in Seconds</span>
              </h1>

              <p className={heroStyles.description}>
                Transform conversations into professional invoices with AI.{" "}
                <span className={heroStyles.descriptionHighlight}>
                  Paste any text
                </span>{" "}
                and watch AI extract items, calculate totals, and generate
                ready-to-send invoices instantly.
              </p>

            </div>

            {/*CTA BTN */}
            <div className={heroStyles.ctaContainer}>
              <SignedIn>
                <button className={heroStyles.primaryButton} type="button" onClick={handleSignedInPrimary}>
                  <div className={heroStyles.primaryButtonOverlay}></div>
                  <span className={heroStyles.previewButtonText}>Start Creating Free</span>
                  <svg
                    className={heroStyles.primaryButtonIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </button>
              </SignedIn>
              <SignedOut>
                <button className={heroStyles.primaryButton} type="button" onClick={handleSignedOutPrimary}>
                  <div className={heroStyles.primaryButtonOverlay}></div>
                  <span className={heroStyles.previewButtonText}>Get Started</span>
                  <svg
                    className={heroStyles.primaryButtonIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </button>
              </SignedOut>

              <a href="#features" className={heroStyles.secondaryButton}>
                <span>Explore Features</span>
                <svg
                  className={heroStyles.secondaryButtonIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>

            {/* Features highlights */}
            <div className={heroStyles.featuresGrid}>
              {[
                { icon: "🤖", label: "AI-Powered", desc: "Smart text parsing" },
                {
                  icon: "⚡",
                  label: "Lightning Fast",
                  desc: "Generate in seconds",
                },
                {
                  icon: "🎨",
                  label: "Professional",
                  desc: "Branded templates",
                },
              ].map((feature, index) => (

                <div key={index} className={heroStyles.featureItem}>
                  <div className={heroStyles.featureIcon}>{feature.icon}</div>
                  <div className={heroStyles.featureText}>
                    <div className={heroStyles.featureLabel}>{feature.label}
                    </div>
                    <div className={heroStyles.featureDesc}>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right side */}
          <div className={heroStyles.demoColumn}>
            <div className={heroStyles.demoFloating1}></div>
            <div className={heroStyles.demoFloating2}></div>

            <div className={heroStyles.demoContainer}>
              <div className={heroStyles.demoCard}>
                <div className={heroStyles.cardHeader}>
                  <div className="space-y-1">
                    <div className={heroStyles.cardLogoContainer}>
                      <div className={heroStyles.cardLogo}>AI</div>

                      <div>
                        <div className={heroStyles.cardClientName}>Acme Corporation</div>

                        <div className={heroStyles.cardClientGst}>ICE: 001234567000089
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={heroStyles.cardInvoiceInfo}>
                    <div className={heroStyles.cardInvoiceLabel}>Invoice</div>

                    <div className={heroStyles.cardInvoiceNumber}>#INV-1024</div>

                    <div className={heroStyles.cardStatus}>Paid</div>

                  </div>

                </div>

                <div className={heroStyles.itemsContainer}>
                  {[
                    {
                      description: "Website Design & Development",
                      amount: "15,000 MAD",
                    },
                    { description: "Consultation (2 hours)", amount: "3,000 MAD" },
                    { description: "Premium Hosting Setup", amount: "2,500 MAD" },
                  ].map((item, index) => (
                    <div key={index} className={heroStyles.itemRow}>
                      <div className="flex items-center gap-3">
                        <div className={heroStyles.itemDot}></div>
                        <span className={heroStyles.itemDescription}>{item.description}</span>
                      </div>
                      <span className={heroStyles.itemAmount}>{item.amount}</span>
                    </div>

                  ))}

                </div>

                <div className={heroStyles.calculationContainer}>
                  <div className={heroStyles.calculationRow}>
                    <span className={heroStyles.calculationLabel}>
                      Subtotal
                    </span>
                    <span className={heroStyles.calculationValue}>20,500 MAD</span>
                  </div>
                  <div className={heroStyles.calculationRow}>
                    <span className={heroStyles.calculationLabel}>
                      TVA (20%)
                    </span>
                    <span className={heroStyles.calculationValue}>4,100 MAD</span>
                  </div>
                  <div className={heroStyles.totalRow}>
                    <span className={heroStyles.totalLabel}>Total Amount</span>
                    <span className={heroStyles.totalValue}>24,600 MAD</span>
                  </div>

                  <div className={heroStyles.actionButtons}>
                    <button className={heroStyles.previewButton} type="button" >
                      <span className={heroStyles.previewButtonText}>Preview Invoice</span>


                    </button>

                    <button className={heroStyles.sendButton} type="button" >
                      <span className={heroStyles.sendButtonText}>Send Invoice</span>
                    </button>

                  </div>
                </div>

                <div className={heroStyles.aiIndicator}>
                  <div className={heroStyles.aiIndicatorContent}>
                    <div className={heroStyles.aiIndicatorDot}>

                    </div>
                    <span className={heroStyles.aiIndicatorText}>AI parsed from: </span>
                    <span className={heroStyles.aiIndicatorText}>"Invoice for website design - 15,000... MAD"</span>


                  </div>

                </div>
                <div className={heroStyles.cornerAccent1}></div>
                <div className={heroStyles.cornerAccent2}></div>
              </div>

              <div className={heroStyles.cardBackground}></div>

            </div>
          </div>
          <div className={heroStyles.scrollIndicator}>
            <div className={heroStyles.scrollContainer}>
              <span className={heroStyles.scrollText}>Scroll to explore</span>
              <div className={heroStyles.scrollBar}>
                <div className={heroStyles.scrollDot}></div>
              </div>

            </div>
          </div>
        </div>

      </div>





    </section >
  )
}

export default Hero
