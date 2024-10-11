import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/ui/motion-dialog";

import { Expand } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
  alt: string;
  liveDemoUrl?: string;
  comingSoon?: boolean;
  content?: string;
  techStack: string[];
}

interface ProjectItemProps {
  project: Project; // Use the Project type here
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <Dialog>
      <DialogTrigger
        key={project.id}
        className="group relative overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
      >
        <div className="relative overflow-hidden border rounded-lg">
          <DialogImage
            src={project.imgSrc}
            alt={project.alt}
            className="h-60 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 opacity-0">
          <h3 className="text-lg font-semibold text-card-foreground">
            {project.title}
          </h3>
          <p className="text-sm text-card-foreground">{project.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <a
              href={project.liveDemoUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                project.liveDemoUrl
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-gray-400 text-white cursor-not-allowed pointer-events-none"
              }`}
            >
              <span
                className={`w-2 h-2 ${
                  project.liveDemoUrl ? "bg-green-500" : "bg-red-500"
                } rounded-full mr-2 animate-pulse`}
              />
              {project.liveDemoUrl
                ? "Live Demo"
                : project.comingSoon
                ? "Coming Soon"
                : "Commercial product"}{" "}
            </a>
            <button
              type="button"
              className="ml-auto relative flex h-6 w-6 shrink-0 scale-100 select-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
              aria-label="Open dialog"
            >
              <Expand size={12} />
            </button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px] rounded-2xl">
          <DialogImage
            src={project.imgSrc}
            alt={project.alt}
            className="h-full w-full"
          />
          <div className="p-6">
            <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
              {project.title}
            </DialogTitle>
            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
              {project.description}
            </DialogSubtitle>
            <DialogDescription disableLayoutAnimation>
              <p className="mt-2 text-zinc-500 font-mono text-xs dark:text-zinc-500">
                {project.content}
              </p>
              <div className="flex flex-wrap mt-2">
                {project.techStack.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`text-black m-1 font-mono font-black border border-black`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex items-center">
                <a
                  href={project.liveDemoUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    project.liveDemoUrl
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-400 text-white cursor-not-allowed pointer-events-none"
                  }`}
                >
                  <span
                    className={`w-2 h-2 ${
                      project.liveDemoUrl ? "bg-green-500" : "bg-red-500"
                    } rounded-full mr-2 animate-pulse`}
                  />
                  {project.liveDemoUrl
                    ? "Live Demo"
                    : project.comingSoon
                    ? "Coming Soon"
                    : "Commercial product"}{" "}
                </a>
              </div>
            </DialogDescription>
          </div>
          <DialogClose className="text-zinc-50" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

export function Project() {
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "E-Commence",
        description:
          "A website that allows customers to customize their phone cases.",
        imgSrc: "/projects/tigcase.jpg",
        alt: "TigCase E-Commence",
        liveDemoUrl: "https://ecommerce-mauve-eta-94.vercel.app",
        content:
          "This project utilizes a modern tech stack including Next.js for server-side rendering, React for building user interfaces, Tailwind CSS for styling, and Framer Motion for animations. It also integrates Prisma for database management and Stripe for payment processing, all deployed on Vercel.",
        techStack: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "Prisma",
          "Postgres",
          "Stripe",
          "Vercel",
        ],
      },
      {
        id: 2,
        title: "Inventory Management System",
        description: "A sleek and responsive mobile app for your business.",
        imgSrc: "/projects/im-dashboard.jpg",
        alt: "Inventory Management System",
        liveDemoUrl: "https://main.d3hb9ddu25osf8.amplifyapp.com",
        content:
          "The Inventory Management System is designed to streamline your business operations by providing a user-friendly interface for tracking and managing inventory. The app allows users to easily add and update items, view stock levels, and generate reports. Built with a focus on responsiveness and ease of use, this application is hosted on AWS.",
        techStack: [
          "Next.js",
          "React",
          "TypeScript",
          "Express",
          "Prisma",
          "Material-UI",
          "Tailwind CSS",
          "Node.js",
          "MongoDB",
          "AWS Amplify",
          "Amazon S3",
          "AWS Lambda",
          "Amazon RDS",
        ],
      },
      {
        id: 3,
        title: "Payroll System(Back End)",
        description:
          "A powerful e-commerce platform to grow your online business.",
        imgSrc: "/projects/payroll.png",
        alt: "Project 3",
        liveDemoUrl: "",
        content:
          "This Odoo-based Payroll System is designed to manage the complex payroll requirements for both construction site workers and office staff. It accommodates industry-specific payroll rules, including varying rates, allowances, and deductions for different worker categories. The system automates the calculation of wages, overtime, and benefits while ensuring compliance with labor regulations. Tailored for a dynamic workforce, it handles distinct pay structures, including special formulas for site-based employees, ensuring accuracy and efficiency in payroll processing.",
        techStack: [
          "Odoo",
          "Python",
          "PostgreSQL",
          "XML",
          "JavaScript",
          "RESTful API",
        ],
      },
      {
        id: 4,
        title: "Payroll WepApp",
        description:
          "A custom-built data visualization tool for your organization.",
        imgSrc: "/projects/payroll-webapp.jpg",
        alt: "Project 4",
        liveDemoUrl: "",
        content:
          "The Payroll WebApp is a comprehensive tool designed for monitoring and administering payroll activities in real time. It features an intuitive dashboard that tracks workers’ in-and-out times, manages allowances, and processes subsidy operations. This web-based solution empowers administrators with a clear overview of workforce attendance and compensation, simplifying the management of time-based payments and allowances. With a focus on efficiency and ease of use, this app enhances payroll oversight and ensures smooth, accurate payroll operations across the workforce.",
        techStack: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        id: 5,
        title: "Odoo-Based ERP Module",
        description:
          "A cutting-edge web application for your industry-leading company.",
        imgSrc: "/projects/odoo-erp.png",
        alt: "Odoo ERP Module",
        liveDemoUrl: "",
        content:
          "During my time at Hung Hing Printing Ltd., I played a key role in contributing to their core business operations by developing and enhancing their internal Odoo-based ERP module. This system was specifically designed to streamline and support their printing business, with a focus on critical functions such as estimation and quotation management. Additionally, I served as a core developer for the delivery module, ensuring seamless integration with their logistics processes. My contributions helped improve efficiency, accuracy, and overall business workflow across multiple departments.",
        techStack: [
          "Odoo",
          "Python",
          "PostgreSQL",
          "JavaScript",
          "XML",
          "ETL",
          "Pentaho Data Integration",
        ],
      },
      {
        id: 6,
        title: "Vendor Sourcing Platform",
        description: "A modern and intuitive web application for your users.",
        imgSrc: "/projects/vendorseek.png",
        alt: "Project 6",
        liveDemoUrl:
          "The Vendor Sourcing Platform originated from a concept developed by a fresh graduate UI/UX designer who approached me to help bring her vision to life. This collaborative project aims to provide a streamlined solution for sourcing vendors, showcasing a user-friendly interface and efficient functionality. Together, we are building this platform not only as a practical tool but also as a valuable addition to her portfolio. This project reflects our commitment to innovation and effective design in creating an engaging user experience.",
        comingSoon: true,
        content:
          "This project utilizes a modern tech stack including Next.js for server-side rendering, React for building user interfaces, Tailwind CSS for styling, and Framer Motion for animations. It also integrates Prisma for database management and Stripe for payment processing, all deployed on Vercel.",
        techStack: ["Next.js", "React", "Tailwind CSS"],
      },
    ],
    []
  );

  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="space-y-3 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            See What I Can Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Discover my projects that highlight my skills in building innovative
            and user-friendly solutions.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
