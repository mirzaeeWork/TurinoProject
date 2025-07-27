import { formatDateTimeForTransactions, formatPersianNumber, generateTourNumber, toPersianDigits } from "@/utils/formatDate";
import React from "react";

function Transaction({item}) {
  return (
    <tr className="text-[9px] md:text-[14px] font-light ">
      <td className="py-2 font-light text-black">
        {formatDateTimeForTransactions(item.createdAt)}
      </td>
      <td className="py-2 font-light text-black">
        {formatPersianNumber(item.amount)}
      </td>
      <td className="hidden md:block py-2 font-light text-black">
        ثبت نام در تور گردشگری
      </td>
      <td className="py-2 font-light text-black">
        سفارش {toPersianDigits(generateTourNumber(item.createdAt, item.amount))}
      </td>
    </tr>
  );
}

export default Transaction;
