import Card from "@/components/element/Card";
import Loading from "@/components/element/Loading";

function TourList({ allTours, isPending,oneLoading}) {

  return (
    <div className="max-w-[1188px] mx-auto px-[1rem] xl:px-0 pt-20">
      <section className="w-full">
        <h3 className="text-[20px] lg:text-[32px]">همه تور ها</h3>
      </section>

      {isPending ? (
        <Loading loading={true} width="100%" height="20vh" />
      ) : allTours && allTours.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mx-auto">
          {allTours.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </section>
      ) : (
        <div className="flex items-center justify-center w-full h-[20vh] text-2xl">
          توری یافت نشد
        </div>
      )}
    </div>
  );
}

export default TourList;
