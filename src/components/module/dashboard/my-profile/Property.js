function PropertyProfile({ className, label, title,span_first="",span_second="" }) {
  return (
    <div
      className={className}
    >
      <span className={`text-[14px] font-light ${span_first}`}>{label}</span>
      <span className={`text-[14px] font-light break-all ${span_second}`}>{title}</span>
    </div>
  );
}

export default PropertyProfile;
