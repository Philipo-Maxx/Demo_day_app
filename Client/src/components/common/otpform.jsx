"use client";
import { Label } from "../ui/label";

import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
// const FormSchema = z.object({
//   pin: z.string().min(6, {
//     message: "Your one-time password must be 6 characters.",
//   }),
// });

export function InputOTPForm({ formData, setFormData, onSubmit, otpText }) {
  //   const form =
  //     useForm <
  //     z.infer <
  //     typeof FormSchema >>
  //       {
  //         resolver: zodResolver(FormSchema),
  //         defaultValues: {
  //           pin: "",
  //         },
  //       };

  //   function onSubmit(data) {
  //     toast({
  //       title: "You submitted the following values:",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //         </pre>
  //       ),
  //     });
  //   }

  return (
    <div className="text-white font-body text-center flex flex-col justify-center items-center">
      <form onSubmit={onSubmit} className="flex flex-col justify-center gap-3">
        <div className="space-y-2">
          <InputOTP
            maxLength={6}
            value={formData}
            onChange={(value) => setFormData(value)}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSeparator />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            {formData === "" ? (
              <>Enter your one-time password.</>
            ) : (
              <>You entered: {formData}</>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="mt-10 w-full bg-white text-[#080B28] font-body text-lg font-extrabold hover:text-black transition ease-in duration-300 hover:bg-gradient-to-r from-yellow-400 to-white/5 focus:outline-none ring ring-yellow-300 hover:ring-0"
        >
          {otpText || "Submit"}
        </Button>
      </form>
    </div>
  );
}
