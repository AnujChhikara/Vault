import { cn } from "@/utils/cn";
import { Code2Icon, ExternalLink } from "lucide-react";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[12rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input shadow-none p-4 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black  border-zinc-700 border  justify-between flex flex-col",
        className
      )}
    >
      <div className=''>
        <div className=' py-2 flex items-center justify-between'>
          <div>
            <Code2Icon />
          </div>
          <Link
            className='hover:text-zinc-400 transition duration-500'
            href={`/code/${id}`}
          >
            <ExternalLink />
          </Link>
        </div>
        <div className='text-lg font-bold text-neutral-200 mb-2 mt-2'>
          {title}
        </div>
        <div className='text-zinc-300 text-xs'>{description}</div>
      </div>
    </div>
  );
};
