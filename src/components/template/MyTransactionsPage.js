import Transaction from "../module/dashboard/transactions/Transaction";

function MyTransactionsPage({ transactions }) {
  return (
    <div className="overflow-y-auto border border-(--color-border)  rounded-[10px]">
      <table className="w-full text-sm text-center">
        <thead className="bg-[#F3F3F3] text-[12px] md:text-[16px]  ">
          <tr>
            <th className="py-3 font-medium">تاریخ و ساعت</th>
            <th className="py-3 font-medium">مبلغ (تومان)</th>
            <th className="hidden md:block py-3 font-medium">نوع تراکنش</th>
            <th className="py-3 font-medium">شماره سفارش</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {transactions.map((item) => (
            <Transaction key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyTransactionsPage;
