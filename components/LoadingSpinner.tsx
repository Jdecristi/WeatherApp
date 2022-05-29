const LoadingImage: React.FC = () => {
    return (
        <>  
            <img src="/images/logo_icon.svg" className="image" />
            <h1 className="loading">Loading</h1>
            <style jsx>
                {`
                    .image {
                        width: 10vw;
                        animation: spin 10s linear infinite;
                    }
                    .loading {
                        font-family: roboto;
                        color: white
                    }
                    @keyframes spin {
                        0% {
                            transform: rotateZ(0);
                        }
                        100% {
                            transform: rotateZ(360deg);
                        }
                    }
                `}
            </style>
        </>
    )
}
export default LoadingImage;