import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/authSlice";

export default function Premium() {

  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const daysLeft = user?.data?.premiumExpiresAt
    ? Math.ceil(
        (
          new Date(user.data.premiumExpiresAt) -
          new Date()
        ) / (1000 * 60 * 60 * 24)
      )
    : 0;

  const handlePayment = async () => {

    try {

      const token = localStorage.getItem("userToken");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = await res.json();

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Spotify Clone",

        description: "Premium Subscription",

        order_id: order.id,

        handler: async function (response) {

          const verifyRes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(response),
            }
          );

          const data = await verifyRes.json();

          if (data.success) {

            // REFRESH PROFILE
            dispatch(getProfile());

            alert("Premium Activated Successfully");

          } else {

            alert("Payment Verification Failed");
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };

  return (

    <div className="min-h-screen bg-[#181818] flex items-center justify-center overflow-hidden px-4">

      <div className="bg-[#181818] border border-gray-800 rounded-3xl overflow-hidden p-8 w-full max-w-md shadow-2xl">

        {/* PREMIUM STATUS */}
        {
          user?.data?.isPremium && (

            <div className="bg-red-500/20 border border-red-500 rounded-2xl p-4 mb-6">

              <h2 className="text-white text-xl font-bold">
                Premium Activated ✅
              </h2>

              <p className="text-gray-300 text-sm mt-2">
                Valid till:
                {" "}
                {
                  new Date(
                    user.data.premiumExpiresAt
                  ).toDateString()
                }
              </p>

              <p className="text-gray-400 text-sm mt-1">
                {daysLeft} days remaining
              </p>

            </div>
          )
        }

        <div className="mb-6">

          <h1 className="text-white text-4xl font-bold mb-2">
            Spotify Premium
          </h1>

          <p className="text-gray-400">
            Enjoy uninterrupted music with premium features.
          </p>

        </div>

        <div className="mb-8">

          <h2 className="text-white text-5xl font-bold">
            ₹1
            <span className="text-lg text-gray-400 font-medium">
              /month
            </span>
          </h2>

        </div>

        <div className="space-y-4 mb-8">

          <div className="flex items-center gap-3 text-gray-300">
            <span>✔</span>
            <p>Ad-free listening</p>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <span>✔</span>
            <p>Unlimited skips</p>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <span>✔</span>
            <p>Offline downloads</p>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <span>✔</span>
            <p>High quality audio</p>
          </div>

        </div>

        {
          !user?.data?.isPremium && (

            <button
              onClick={handlePayment}
              className="w-full bg-[#1DB954] hover:bg-green-400 transition-all duration-300 text-black font-bold py-4 rounded-full text-lg"
            >
              Buy Premium
            </button>
          )
        }

      </div>

    </div>
  );
}