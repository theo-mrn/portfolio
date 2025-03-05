import { HoverEffect } from "../ui/card-hover-effect";

export function About() {
  return (
    <div className="max-w-6xl mx-auto px-8 -z-50">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [

    {
        title: "Next.js",
        link: "/svg/next.png",
      },
      {
        title: "Node.js",
        link: "/svg/node.svg",
      },
      {
        title: "PostgreSQL",
        link: "/svg/postgresql.png",
      },
  {
    title: "React",
    link: "/svg/react.svg",
  },
  {
    title: "Docker",
    link: "/svg/docker.svg",
  },
  {
    title: "MongoDB",
    link: "/svg/mongodb.svg",
  },
  {
    title: "Tailwind CSS",
    link: "/svg/tailwind.svg",
  },
  {
    title: "Resend",
    link: "/svg/resend.png",
  },
  {
    title: "Casandra",
    link: "/svg/cassandra.png",
  },
  {
    title: "TypeScript",
    link: "/svg/typescript.svg",
  },
  {
    title: "Stripe",
    link: "/svg/stripe.png",
  },
  {
    title: "My SQL",
    link: "/svg/mysql.svg",
  },


 


];
