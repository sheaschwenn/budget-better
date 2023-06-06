import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const testimonials = [
  {
    name: "Emily Johnson",
    role: "Waitress",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: `“I used to worry about my finances, with Budget Better I sleep better at night with the knowledge I'm in control of my finances.”`,
  },
  {
    name: "Mike Johnson",
    role: "Freelancer",
    imageUrl:
      "https://images.unsplash.com/photo-1504593811423-6dd6657890d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: `“Budget Better has revolutionized how I manage my finances. It's an absolute game changer!”`,
  },
  {
    name: "Linda Smith",
    role: "Small Business Owner",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: `“As a small business owner, it's crucial to keep track of my expenses. Budget Better makes it easy and intuitive.”`,
  },
  {
    name: "Sophie Jones",
    role: "Student",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: `“I've never been good with money, but Budget Better has helped me save and budget effectively. I highly recommend it!”`,
  },
  {
    name: "Mack Wilson",
    role: "Software Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: `“Budget Better's simple and user-friendly design makes tracking expenses and budgeting a breeze. I can't imagine managing my finances without it.”`,
  },
];

export default function Testimonials() {
  return (
    <div>
      <Navbar />
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg"
            alt=""
          />
          {testimonials.map((testimonial, index) => (
            <figure className="mt-10" key={index}>
              <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                <p>{testimonial.quote}</p>
              </blockquote>
              <figcaption className="mt-10">
                <img
                  className="mx-auto h-10 w-10 rounded-full"
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                />
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <svg
                    viewBox="0 0 2 2"
                    width={3}
                    height={3}
                    aria-hidden="true"
                    className="fill-gray-900"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

// export default function Testamonials() {
//   return (
//     <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
//       <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
//       <div className="mx-auto max-w-2xl lg:max-w-4xl">
//         <img
//           className="mx-auto h-12"
//           src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg"
//           alt=""
//         />
//         <figure className="mt-10">
//           <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
//             <p>
//               “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
//               expedita voluptas culpa sapiente alias molestiae. Numquam corrupti
//               in laborum sed rerum et corporis.”
//             </p>
//           </blockquote>
//           <figcaption className="mt-10">
//             <img
//               className="mx-auto h-10 w-10 rounded-full"
//               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               alt=""
//             />
//             <div className="mt-4 flex items-center justify-center space-x-3 text-base">
//               <div className="font-semibold text-gray-900">Judith Black</div>
//               <svg
//                 viewBox="0 0 2 2"
//                 width={3}
//                 height={3}
//                 aria-hidden="true"
//                 className="fill-gray-900"
//               >
//                 <circle cx={1} cy={1} r={1} />
//               </svg>
//               <div className="text-gray-600">CEO of Workcation</div>
//             </div>
//           </figcaption>
//         </figure>
//       </div>
//     </section>
//   );
// }
