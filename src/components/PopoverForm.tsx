"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { useRef, useState, useEffect, useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

export default function PopoverForm() {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize the form
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const { control, handleSubmit } = methods; // Destructure control from methods

  const onSubmit = async (data: FieldValues) => {
    const formspreeEndpoint = "https://formspree.io/f/xkgnnjdv";

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
    }
    closeMenu();
  };

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50"
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className="text-sm"
          >
            Open Form
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              layoutId={`popover-${uniqueId}`}
              className="absolute h-auto min-w-[364px] w-auto overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700"
              style={{ borderRadius: 12 }}
              ref={formContainerRef}
            >
              <Form {...methods}>
                {" "}
                {/* Wrap the form in Form */}
                <form
                  className="flex h-full flex-col p-6 bg-white rounded-lg shadow-lg dark:bg-zinc-800"
                  onSubmit={handleSubmit(onSubmit)} // Ensure this is called correctly
                >
                  <motion.span
                    layoutId={`popover-label-${uniqueId}`}
                    aria-hidden="true"
                    className="absolute left-4 top-3 select-none text-sm border-b-2 text-black"
                  >
                    Fill out the form
                  </motion.span>

                  {/* Name Field */}
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mt-4 text-left">
                        <FormDescription>
                          Please enter your full name
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            {...field}
                            aria-label="Your Name"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormDescription className="mt-2 text-left">
                          Your email will not share with anyone else
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Your Email"
                            {...field}
                            aria-label="Your Email"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormDescription className="mt-2 text-left">
                          Please provide your message.
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Your Message"
                            {...field}
                            aria-label="Your Message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between items-center px-4 py-3 mt-4">
                    <Button
                      type="button"
                      className="flex items-center"
                      onClick={closeMenu}
                      aria-label="Close popover"
                    >
                      <ArrowLeftIcon size={16} />
                    </Button>
                    <Button type="submit" aria-label="Submit contact form">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
