import React, { useState, useEffect } from 'react';
import { api, msg } from '../services';
import { FormModal, SystemButton } from '../components';
import DataTable from 'react-data-table-component';

const BusRoute = () => {
    // Module name
    const moduleName = 'Route';

    /* --- State declarationss --- */

    const [entities, setEntities] = useState([]);

    const [initialEntities, setInitialEntities] = useState([]);

    const [showModalState, setShowModalState] = useState(false);

    const [isLoading, setIsLoading] = useState([]);
    const user_id = localStorage.getItem('user_id');

    const [newEntity, setNewEntity] = useState({
        id: '',
        route_name: '',
        start_location: '',
        end_location: '',
        distance: '',
        user_id: user_id
    });

    const [isEdit, setIsEdit] = useState(false);

    const [editId, setEditId] = useState([]);

    let dataColumns = [
        {
            name: 'Bus  Route',
            selector: 'route_name',
        },
        {
            name: 'Start Location',
            selector: 'start_location',
        },
        {
            name: 'End Location',
            selector: 'end_location',
        },
        {
            name: 'Distance',
            selector: 'distance',
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

            const response = await api.get('route_det');

            await response.data.routedet.map((routedet) => {

                dataRows.push({
                    route_name: routedet.route_name,
                    start_location: routedet.start_location,
                    end_location: routedet.end_location,
                    distance: routedet.distance,
                    actions: actionButtons(routedet.id),
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
                initialEntities.filter((entity) => entity.route_name.includes(searchPhrase)),
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
    const handleValueChange = (e) => {
        const targetInput = e.target;
        const inputName = targetInput.name;
        const inputValue = targetInput.value;

        setNewEntity({
            ...newEntity,
            [inputName]: inputValue,
        });
    };


    const editRow = async (id) => {


        setEditId(id);
        const response = await api.get(`get_route_det/${id}`);
        setNewEntity({
            id: response.data.routedet.id,
            route_name: response.data.routedet.route_name,
            start_location: response.data.routedet.start_location,
            end_location: response.data.routedet.end_location,
            distance: response.data.routedet.distance,
            user_id: user_id

        });
        setShowModalState(true);
        setIsEdit(true);

    };

    const deleteEntry = async (id) => {
        try {

            const res = await api.get(`get_route_status/${id}`);

            if (res.error) {
                Object.values(res.error).forEach((err) => {
                    msg.error(err[0]);
                });
                return;
            } else {
                const response = await api.get(`destroy_route/${id}`);

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
                const response = await api.post('save_route').values({
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
                const response = await api.update('update_route').values({
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
            route_name: '',
            start_location: '',
            end_location: '',
            distance: '',
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
                                            <label htmlFor="route_name">Route Name</label>
                                            <input
                                                type="text"
                                                name="route_name"
                                                id="route_name"
                                                className="form-control form-control-sm"
                                                value={newEntity.route_name}
                                                onChange={handleValueChange}
                                                maxLength="100"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="distance">Distance</label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="form-control form-control-sm"
                                                value={newEntity.distance}
                                                onChange={handleValueChange}
                                                maxLength="50"
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="start_location">Start Location</label>
                                            <input
                                                type="text"
                                                name="start_location"
                                                id="start_location"
                                                className="form-control form-control-sm"
                                                value={newEntity.start_location}
                                                onChange={handleValueChange}
                                                maxLength="60"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="end_location">End Location</label>
                                            <input
                                                type="text"
                                                name="end_location"
                                                id="end_location"
                                                className="form-control form-control-sm"
                                                value={newEntity.end_location}
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
                                    placeholder="Filter item Name..."
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


export default BusRoute;