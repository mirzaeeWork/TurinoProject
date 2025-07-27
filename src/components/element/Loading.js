import { BeatLoader } from "react-spinners";

const override = {
    display: "block",
    borderColor: "black",
    margin: "0 auto",
};

function Loading({loading,width,height}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width,
                height,
            }}
        >
            <BeatLoader
                color='#28A745'
                loading={loading}
                cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loading;