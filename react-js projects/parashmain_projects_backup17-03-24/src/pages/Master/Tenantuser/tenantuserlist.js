const renderTHContent = () => {
    return (
        <>
            <tr>
                <th className="text-center">Action</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
            </tr>
        </>
    );
};

const renderTdContent = (item) => {
    return (
        <>
            <td>
                <h5 className="font-size-14 text-truncate"></h5>
                <p className="mb-0">
                    <span className="fw-medium">{item.username}</span>
                </p>
            </td>
            <td>
                <h5 className="font-size-14 text-truncate"></h5>
                <p className="mb-0">
                    <span className="fw-medium">{item.email}</span>
                </p>
            </td>
            <td>
                <h5 className="font-size-14 text-truncate"></h5>
                <p className="mb-0">
                    <span className="fw-medium">{item.mobile}</span>
                </p>
            </td>
        </>
    );
};

return (
    <React.Fragment>
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="User List" breadcrumbItems={breadcrumbItems} />
                {isLoading ? (
                    <>
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#4D5DC6"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{
                                justifyContent: "center",
                            }}
                            wrapperClassName=""
                            visible={true}
                        />
                    </>
                ) : (
                    <>
                        <TableComponent
                            allUserData={allUserData}
                            perPage={perPage}
                            currentpageIndex={currentpageIndex}
                            pageTotal={pageTotal}
                            history={history}
                            setPerPage={setPerPage}
                            setIsUserID={setIsUserID}
                            setShow={setShow}
                            getAllUsers={getAllUsers}
                            renderTHContent={renderTHContent}
                            renderTdContent={renderTdContent}
                            btnName={"Add User"}
                            addData={"/createuser"}
                            editData={"/edituser/"}
                        />
                    </>
                )}
            </Container>
        </div>
        <Modal isOpen={show} backdrop="static">
            <ModalHeader toggle={() => setShow(false)}>Delete Confirmation</ModalHeader>
            <ModalBody>
                <p>Are you sure you want to delete this user?</p>
            </ModalBody>
            <ModalFooter>
                <Button type="button" color="light" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button type="button" color="primary" onClick={() => DeleteUserData(isUserID)}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    </React.Fragment>
);