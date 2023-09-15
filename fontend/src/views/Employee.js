import React, { useState, useEffect } from 'react';
import { api, msg } from '../services';
import { FormModal, SystemButton } from '../components';
import DataTable from 'react-data-table-component';

const Employee = () => {
    // Module name
    const moduleName = 'Employee';

    /* --- State declarationss --- */

    const [entities, setEntities] = useState([]);

    const [initialEntities, setInitialEntities] = useState([]);

    const [showModalState, setShowModalState] = useState(false);

    const [isLoading, setIsLoading] = useState([]);
    const user_id = localStorage.getItem('user_id');

    const [newEntity, setNewEntity] = useState({
        id: '',
        first_name: '',
        last_name: '',
        position: '',
        contact: '',
        user_id: user_id
    });

    const [isEdit, setIsEdit] = useState(false);

    const [editId, setEditId] = useState([]);

    let dataColumns = [
        {
            name: 'First Name',
            selector: 'first_name',
        },
        {
            name: 'Last Name',
            selector: 'last_name',
        },
        {
            name: 'Position',
            selector: 'position',
        },
        {
            name: 'Contact',
            selector: 'contact',
        },
        {
            name: 'Actions',
            selector: 'actions',
        },
    ];

    let dataRows = [];

    /* --- End of state declarations --- */

    useEffect(() => {
        fetchData();
    }, []);

    /* --- Component functions --- */

    const fetchData = async () => {
        try {
            setIsLoading(true);
            let datd = [];
            setEntities(datd);

            const response = await api.get('employee_det');

            await response.data.employeedet.map((employeedet) => {

                dataRows.push({
                    first_name: employeedet.first_name,
                    last_name: employeedet.last_name,
                    position: employeedet.position,
                    contact: employeedet.contact,
                    actions: actionButtons(employeedet.id),
                });
            });

            setEntities(dataRows);
            setInitialEntities(dataRows);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            return msg.error('Unable to fetch data!');
        }
    };

    const filterData = (e) => {
        let searchPhrase = e.target.value.toString();

        if (searchPhrase) {
            setEntities(
                initialEntities.filter((entity) => entity.first_name.includes(searchPhrase)),
            );
        } else {
            setEntities(initialEntities);
        }
    };


    const actionButtons = (id) => {
        return (
            <div>
                <div>
                    <SystemButton type="edit" showText method={() => editRow(id)} />
                </div>
                &nbsp;
                <div>
                    <SystemButton type="delete" showText method={() => deleteEntry(id)} />
                </div>
            </div>
        );
    };
    const handleSelectChange = (event) => {
        setNewEntity({
            ...newEntity,
            position: event.target.value,
        });
    };
    const handleValueChange = (e) => {
        const targetInput = e.target;
        const inputName = targetInput.name;
        const inputValue = targetInput.value;

        setNewEntity({
            ...newEntity,
            [inputName]: inputValue
        });
    };


    const editRow = async (id) => {


        setEditId(id);
        const response = await api.get(`get_employee_det/${id}`);
        setNewEntity({
            id: response.data.employeedet.id,
            first_name: response.data.employeedet.first_name,
            last_name: response.data.employeedet.last_name,
            position: response.data.employeedet.position,
            contact: response.data.employeedet.contact,
            user_id: user_id

        });
        setShowModalState(true);
        setIsEdit(true);

    };

    const deleteEntry = async (id) => {
        try {

            const res = await api.get(`get_employee_status/${id}`);

            if (res.error) {
                Object.values(res.error).forEach((err) => {
                    msg.error(err[0]);
                });
                return;
            } else {
                const response = await api.get(`destroy_employee/${id}`);

                if (response.error) {
                    Object.values(response.error).forEach((err) => {
                        msg.error(err[0]);
                    });
                    return;
                } else {
                    msg.success(response.data);
                }
            }


        } catch (error) {
            msg.error(error);
            return console.log(error);
        } finally {
            setIsEdit(false);
            setEditId('');
            setShowModalState(false);
            resetAll();
            // fetchData();
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 3000);

            return () => clearTimeout(timeout);
        }


    }

    const toggleFormModal = () => {
        setShowModalState(!showModalState);
        setIsEdit(false);
        resetAll();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        save();
    };

    const save = async () => {
        if (isEdit === false) {
            try {
                const response = await api.post('save_employee').values({
                    entity: newEntity,
                });

                if (response.error) {
                    Object.values(response.error).forEach((err) => {
                        msg.error(err[0]);
                    });
                    return;
                }

                msg.success(response.data);

            } catch (error) {
                msg.error(error);
                return console.log(error);
            } finally {
                setShowModalState(false);
                resetAll();
                fetchData();
            }
        } else {
            try {
                const response = await api.update('update_employee').values({
                    entity: newEntity,
                });

                if (response.error) {
                    Object.values(response.error).forEach((err) => {
                        msg.error(err[0]);
                    });
                    return;
                }

                msg.success(response.data);
            } catch (error) {
                msg.error(error);
                return console.error(error);
            } finally {
                setIsEdit(false);
                setEditId('');
                setShowModalState(false);
                resetAll();
                fetchData();
            }
        }
    };

    const resetAll = () => {
        setNewEntity({
            id: '',
            first_name: '',
            last_name: '',
            position: '',
            contact: '',
            user_id: user_id
        });

        setIsLoading(false);
    };
    const required = (value) => {
        if (!value) {
            return (
                <div className="invalid-feedback d-block">
                    This field is required!
                </div>
            );
        }
    };


    //  validations

    /* --- End of component functions --- */

    /* --- Component renders --- */

    return (
        <div>
            <h3 className="text-center">{moduleName}</h3>
            <br />
            {isLoading ? (
                <div>
                    <br />
                    <br />
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="row">
                        <div className="col-2">
                            <SystemButton type={'add-new'} method={toggleFormModal} />
                        </div>
                    </div>

                    {/* Form modal componenet */}
                    <FormModal
                        moduleName={moduleName}
                        modalState={showModalState}
                        toggleFormModal={toggleFormModal}
                        width='800px'
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="first_name">Fist Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                className="form-control form-control-sm"
                                                value={newEntity.first_name}
                                                onChange={handleValueChange}
                                                maxLength="60"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                className="form-control form-control-sm"
                                                value={newEntity.last_name}
                                                onChange={handleValueChange}
                                                maxLength="60"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="position">User Role</label>
                                            <select
                                                name="position"
                                                id="position"
                                                className="form-control form-control-sm"
                                                value={newEntity.position}
                                                onChange={handleSelectChange}
                                                required
                                            >
                                                <option value="">-- Select User Role --</option>
                                                <option value="admin">Admin</option>
                                                <option value="owner">Owner</option>
                                                <option value="driver">Driver</option>
                                                <option value="assistent">Assistent</option>
                                                <option value="staff">Staff</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="contact">Contacts</label>
                                            <input
                                                type="text"
                                                name="contact"
                                                id="contact"
                                                className="form-control form-control-sm"
                                                value={newEntity.contact}
                                                onChange={handleValueChange}
                                                maxLength="50"
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>
                                <br />
                            </div>
                            <div className="modal-footer">
                                <SystemButton type={'close'} method={toggleFormModal} />
                                <SystemButton type={'save'} />
                            </div>
                        </form>
                    </FormModal>
                    {/* End of form modal componenet */}

                    <br />

                    {/* Data list componenet */}
                    <div className="row justify-content-end">
                        <div className="col-4">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="filter_data"
                                    id="filter_data"
                                    onChange={filterData}
                                    placeholder="Filter  Name..."
                                />
                            </div>
                        </div>
                    </div>
                    <DataTable
                        columns={dataColumns}
                        data={entities}
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        pagination
                        paginationPerPage={20}
                        paginationRowsPerPageOptions={[10, 20, 30, 60, 100]}
                    />
                    {/* End of data list component */}
                </div>
            )}
        </div>
    );

    /* --- End of component renders --- */
};


export default Employee;