import React, { useState, useEffect } from 'react';
import { api, msg } from '../services';
import { FormModal, SystemButton } from '../components';
import DataTable from 'react-data-table-component';

const User = () => {
    // Module name
    const moduleName = 'User';

    /* --- State declarationss --- */

    const [entities, setEntities] = useState([]);

    const [initialEntities, setInitialEntities] = useState([]);

    const [showModalState, setShowModalState] = useState(false);

    const [isLoading, setIsLoading] = useState([]);
  
    const [newEntity, setNewEntity] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_role:'',
        status: ''
    });

    const [isEdit, setIsEdit] = useState(false);

    const [editId, setEditId] = useState([]);

    let dataColumns = [
        {
            name: 'First Name',
            selector: 'first_name',
        },
        {
            name: 'Last name',
            selector: 'last_name',
            wrap: true,
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
        },
        {
            name: 'Role',
            selector: 'user_role',
        },
        {
            name: 'Status',
            selector: 'status',
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

            const response = await api.get('users_det');

            await response.data.userdet.map((userdet) => {
                console.log(userdet);
                dataRows.push({
                    first_name: userdet.first_name,
                    last_name: userdet.last_name,
                    email: userdet.email,
                    user_role: userdet.user_role,
                    status: statusButtons(userdet.id, userdet.status),
                    actions: actionButtons(userdet.id),
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
            </div>
        );
    };
    const statusButtons = (id, status) => {

        if (status == '1') {
            return (
                <div>
                    <div className="col-6  justify-content-center">
                        <button type="button" class="btn btn-success" onClick={() => changeStatus(id, 0)} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="col-6  justify-content-center">
                        <button type="button" class="btn btn-danger" onClick={() => changeStatus(id, 1)} />
                    </div>

                </div>
            );
        }

    };
     const handleSelectChange = (event) => {
    setNewEntity({
        ...newEntity,
        user_role:  event.target.value,
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
        const response = await api.get(`get_user_det/${id}`);
        setNewEntity({
            id: response.data.userdet.id,
            first_name: response.data.userdet.first_name,
            last_name: response.data.userdet.last_name,
            email: response.data.userdet.email,
            user_role: response.data.userdet.user_role,

        });
        setShowModalState(true);
        setIsEdit(true);

    };
    const changeStatus = async (id, status) => {
        try {
            const response = await api.post('update_user_status').values({
                id: id,
                status: status,
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
                const response = await api.post('register').values({
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
                const response = await api.update('update_user').values({
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
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            status: '',
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

    const vpassword = (value) => {
        if (value.length < 8 || value.length > 40) {
            return (
                <div className="invalid-feedback d-block">
                    The password must be between 8 and 40 characters.
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
                                    <div className="col-8">
                                        <div className="form-group">
                                            <label htmlFor="first_name">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                className="form-control form-control-sm"
                                                value={newEntity.first_name}
                                                onChange={handleValueChange}
                                                maxLength="100"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-end">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                className="form-control form-control-sm"
                                                value={newEntity.last_name}
                                                onChange={handleValueChange}
                                                maxLength="50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="form-control form-control-sm"
                                                value={newEntity.email}
                                                onChange={handleValueChange}
                                                maxLength="50"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="password">password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="form-control form-control-sm"
                                                value={newEntity.password}
                                                onChange={handleValueChange}
                                                validations={[required, vpassword]}
                                                maxLength="50"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="user_role">User Role</label>
                                            <select
                                                name="user_role"
                                                id="user_role"
                                                className="form-control form-control-sm"
                                                value={newEntity.user_role}
                                                onChange={handleSelectChange}
                                                required
                                            >
                                                <option value="">-- Select User Role --</option>
                                                <option value="admin">Admin</option>
                                                <option value="admin">Owner</option>
                                                <option value="user">User</option>
                                                {/* Add more role options as needed */}
                                            </select>
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
                                    placeholder="Filter User Name..."
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

export default User;
