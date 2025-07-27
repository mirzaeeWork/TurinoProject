import Link from "next/link";

function LinkFooter({title,linkArray}) {
  return (
    <div className="col-span-1">
      <h3 className="text-[22px] lg:text-[26px] font-semibold mb-3.5">{title}</h3>
      <div className="flex flex-col gap-1.5">
        {linkArray.map((item,i)=><Link key={item.text} href={item.href || "#"} className="text-[16px] lg:text-[18px] ">
          {item.text}
        </Link>)}       
      </div>
    </div>
  );
}

export default LinkFooter;
