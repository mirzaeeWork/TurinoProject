import { BeatLoader } from "react-spinners";

const override = {
    display: "block",
    borderColor: "black",
    margin: "0 auto",
};

function LoadingForButton({loading}) {
    return (
        <BeatLoader
            color='#FFFF'
            loading={loading}
            cssOverride={override}
            size={12}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="w-[48px] "
        />
    )
}

export default LoadingForButton