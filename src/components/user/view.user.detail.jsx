import { Button, Drawer } from "antd"
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
    // console.log(props);
    return (
        <>
            <Drawer
                width={"40vw"}
                title="Detail user"
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false);
                }}
                open={isDetailOpen}
            >
                {dataDetail ?
                    <>
                        <p>IP:{dataDetail._id}</p>
                        <br />
                        <p>Full name:{dataDetail.fullName}</p>
                        <br />
                        <p>Email:{dataDetail.email}</p>
                        <br />
                        <p>Phone number:{dataDetail.phone}</p>
                        <br />
                        <p>Avatar:</p>
                        <div>
                            <img height={250} width={300}
                                src={`${import.meta.env.VITE_URL_BACKEND}/images/avatar/${dataDetail.avatar}`}
                            ></img>
                        </div>
                        <div>
                            <label htmlFor="btnUpload" style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                Upload Avatar
                            </label>
                            <input type='file' hidden id='btnUpload'></input>
                        </div>
                        {/* <Button type='primary'>Upload Avatar</Button> */}
                    </>
                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                }
            </Drawer>
        </>)
}
export default ViewUserDetail;