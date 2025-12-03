// export default function SignUpPage() {
//     return (
//         <div className="max-w-md mx-auto mt-10 rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm w-full">
//             <div className="flex flex-col space-y-1.5 p-6 text-center">
//                 <h3 className="font-semibold tracking-tight text-2xl">
//                     Welcome
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                     Sign In to Get Access
//                 </p>
//             </div>

//             <div className="p-6 pt-0">
//                 <form onSubmit={onSubmit} className="space-y-4">
//                     <FormInput
//                         form={form}
//                         name="email"
//                         label="Email"
//                         placeholder="Insert email here"
//                         type="email"
//                     />
//                     <FormInput
//                         form={form}
//                         name="password"
//                         label="Password"
//                         placeholder="******"
//                         type="password"
//                     />

//                     <button
//                         type="submit"
//                         disabled={isPendingSignIn}
//                         className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 hover:bg-gray-900/90 h-10 px-4 py-2 w-full"
//                     >
//                         {isPendingSignIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'SignIn'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// } 