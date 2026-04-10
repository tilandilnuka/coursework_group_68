export default function Warranty() {
  return (
    <div className="min-h-screen bg-black text-white pt-2 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 mt-32">
          <div className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <h1 className="text-5xl font-thin mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Warranty Information
          </h1>

          <p className="text-xl text-gray-400">
            Comprehensive Protection for Your Mobile Devices
          </p>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-thin mb-6 text-orange-500">
            Standard Warranty Coverage
          </h2>

          <p className="text-gray-300 mb-4">
            All eligible phones, tablets, and branded accessories purchased
            from TechStore include manufacturer warranty coverage:
          </p>

          <ul className="space-y-2 text-gray-300">
            <li>✓ 1-year limited hardware warranty on eligible devices</li>
            <li>✓ Covers manufacturing defects and hardware failures</li>
            <li>✓ Free repair or replacement of defective parts</li>
            <li>✓ Technical support during warranty period</li>
            <li>✓ Warranty starts from date of purchase</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">Basic Plan</h3>
            <div className="text-4xl font-bold mb-2">$99</div>
            <p className="mb-6">2-Year Extended Warranty</p>
            <ul className="space-y-2 text-sm">
              <li>✓ Hardware failure coverage</li>
              <li>✓ Parts and labor included</li>
              <li>✓ Phone support</li>
              <li>✓ Repair turnaround 5-7 days</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
            <div className="text-4xl font-bold mb-2">$199</div>
            <p className="mb-6">3-Year Extended Warranty</p>
            <ul className="space-y-2 text-sm">
              <li>✓ All Basic Plan features</li>
              <li>✓ Accidental damage protection</li>
              <li>✓ Priority support</li>
              <li>✓ Repair turnaround 2-3 days</li>
              <li>✓ One battery replacement</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ultimate Plan</h3>
            <div className="text-4xl font-bold mb-2">$349</div>
            <p className="mb-6">4-Year Complete Protection</p>
            <ul className="space-y-2 text-sm">
              <li>✓ All Premium Plan features</li>
              <li>✓ Theft and loss protection</li>
              <li>✓ 24/7 VIP support</li>
              <li>✓ Next-day repair service</li>
              <li>✓ Unlimited battery replacements</li>
              <li>✓ Data recovery service</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-thin mb-6 text-orange-500">
            What's Covered
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Hardware Failures
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Mainboard defects</li>
                <li>• Battery faults</li>
                <li>• Charging issues</li>
                <li>• Display problems</li>
                <li>• Speaker and microphone issues</li>
                <li>• Ports and connectors</li>
                <li>• Camera module failures</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Accidental Damage (Premium+)
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Cracked screens</li>
                <li>• Liquid spills</li>
                <li>• Drops and impacts</li>
                <li>• Power surge damage</li>
                <li>• Cosmetic damage affecting function</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-thin mb-6 text-orange-500">
            What's NOT Covered
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>✗ Intentional damage or abuse</li>
            <li>✗ Software issues and viruses</li>
            <li>
              ✗ Cosmetic damage (scratches, dents) that doesn't affect function
            </li>
            <li>✗ Lost accessories (chargers, cases)</li>
            <li>✗ Unauthorized repairs or modifications</li>
            <li>✗ Normal wear and tear (battery degradation under 50%)</li>
            <li>✗ Data loss or software corruption</li>
          </ul>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8">
          <h2 className="text-3xl font-thin mb-6 text-orange-500">
            How to File a Claim
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-gray-400">
                Call 1-800-123-4568 or use live chat
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Diagnosis</h3>
              <p className="text-sm text-gray-400">
                Tech will troubleshoot the issue
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Ship or Drop-off</h3>
              <p className="text-sm text-gray-400">
                Free shipping label provided
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Repair & Return</h3>
              <p className="text-sm text-gray-400">
                Fixed and shipped back to you
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

