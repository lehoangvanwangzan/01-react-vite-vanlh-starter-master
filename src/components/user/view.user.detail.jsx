import { Drawer } from "antd"
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
    // console.log(props);
    return (
        <>
            <Drawer
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