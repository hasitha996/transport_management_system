import React, { useState, useEffect } from 'react';
import { api, msg } from '../services';
import { FormModal, SystemButton } from '../components';
import DataTable from 'react-data-table-component';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


const Schedule = () => {
    // Module name
    const moduleName = 'Schedule';

    /* --- State declarationss --- */

    const [entities, setEntities] = useState([]);

    const [initialEntities, setInitialEntities] = useState([]);

    const [showModalState, setShowModalState] = useState(false);

    const [isLoading, setIsLoading] = useState([]);
    const [busList, setBusList] = useState();
    const [routeList, setRouteList] = useState();
    const [empList, setEmpList] = useState();
    const user_id = localStorage.getItem('user_id');

    const [newEntity, setNewEntity] = useState({
        id: '',
        bus_id: '',
        bus_reg_no: '',
        route_id: '',
        route_name: '',
        emp_id: '',
        emp_name: '',
        start_location: '',
        end_location: '',
        departure_time: '',
        arrival_time: '',
        user_id: user_id
    });

    const [isEdit, setIsEdit] = useState(false);

    const [editId, setEditId] = useState([]);

    let dataColumns = [
        {
            name: 'Bus Reg No',
            selector: 'bus_reg_no',
        },
        {
            name: 'Route',
            selector: 'route_name',
        },
        {
            name: 'Employee',
            selector: 'emp_name',
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
            name: 'Departure Time',
            selector: 'departure_time',
        },
        {
            name: 'Arrival Time',
            selector: 'arrival_time',
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

            const response = await api.get('schedule_det');

            await response.data.scheduledet.map((scheduledet) => {

                dataRows.push({
                    bus_id: scheduledet.bus_id,
                    bus_reg_no: scheduledet.bus.bus_reg_no,
                    route_id: scheduledet.route_id,
                    route_name: scheduledet.route.route_name,
                    emp_id: scheduledet.emp_id,
                    emp_name: scheduledet.employee.first_name,
                    start_location: scheduledet.start_location,
                    end_location: scheduledet.end_location,
                    departure_time: scheduledet.departure_time,
                    arrival_time: scheduledet.arrival_time,
                    actions: actionButtons(scheduledet.id),
                });
            });
            setBusList(response.data.bus);
            setRouteList(response.data.route);
            setEmpList(response.data.employee);

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
                initialEntities.filter((entity) => entity.bus_reg_no.includes(searchPhrase)),
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
    const handleSelectBusChange = (event) => {
        setNewEntity({
            ...newEntity,
            bus_id: event.target.value,
        });
    };
    const handleSelectRouteChange = (event) => {
        setNewEntity({
            ...newEntity,
            route_id: event.target.value,
        });
    };
    const handleSelectEmpChange = (event) => {
        setNewEntity({
            ...newEntity,
            emp_id: event.target.value,
        });
    };
    const handleDatetimeChange = (selectedMoment) => {
        // const formattedDTime = selectedMoment.format('YYYY-MM-DD HH:mm:ss');
        setNewEntity({
            ...newEntity,
            departure_time: selectedMoment,
        });

    };
    const handleADatetimeChange = (selectedMoment) => {
        // const formattedATime = selectedMoment.format('YYYY-MM-DD HH:mm:ss');
        setNewEntity({
            ...newEntity,
            arrival_time: selectedMoment,
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
        const response = await api.get(`get_schedule_det/${id}`);
        setNewEntity({
            id: response.data.scheduledet.id,
            bus_id: response.data.scheduledet.bus_id,
            route_id: response.data.scheduledet.route_id,
            emp_id: response.data.scheduledet.emp_id,
            start_location: response.data.scheduledet.start_location,
            end_location: response.data.scheduledet.end_location,
            departure_time: response.data.scheduledet.departure_time,
            arrival_time: response.data.scheduledet.arrival_time,
            user_id: user_id
        });
        setShowModalState(true);
        setIsEdit(true);

    };

    const deleteEntry = async (id) => {
        try {
            const response = await api.get(`destroy_schedule/${id}`);

            if (response.error) {
                Object.values(response.error).forEach((err) => {
                    msg.error(err[0]);
                });
                return;
            } else {
                msg.success(response.data);
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
                const response = await api.post('save_schedule').values({
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
                const response = await api.update('update_schedule').values({
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
            bus_id: '',
            bus_reg_no: '',
            route_id: '',
            route_name: '',
            emp_id: '',
            emp_name: '',
            start_location: '',
            end_location: '',
            departure_time: '',
            arrival_time: '',
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
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="bus_id">Bus </label>
                                            <select
                                                name="bus_id"
                                                id="bus_id"
                                                className="form-control form-control-sm"
                                                value={newEntity.bus_id}
                                                onChange={handleSelectBusChange}
                                                required
                                            >
                                                <option value="">-- Select an option --</option>
                                                {busList.map((option) => (
                                                    <option key={option.bus_reg_no} value={option.id} value1={option.id}>
                                                        {option.bus_reg_no}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="route_id">Route</label>
                                            <select
                                                name="route_id"
                                                id="route_id"
                                                className="form-control form-control-sm"
                                                value={newEntity.route_id}
                                                onChange={handleSelectRouteChange}
                                                required
                                            >
                                                <option value="">-- Select an option --</option>
                                                {routeList.map((option) => (
                                                    <option key={option.route_name} value={option.id} value1={option.id}>
                                                        {option.route_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="emp_id">Employee</label>
                                            <select
                                                name="emp_id"
                                                id="emp_id"
                                                className="form-control form-control-sm"
                                                value={newEntity.emp_id}
                                                onChange={handleSelectEmpChange}
                                                required
                                            >
                                                <option value="">-- Select an option --</option>
                                                {empList.map((option) => (
                                                    <option key={option.first_name} value={option.id} value1={option.id}>
                                                        {option.first_name}
                                                    </option>
                                                ))}
                                            </select>
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
                                                maxLength="50"
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
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">

                                            <label htmlFor="departure_time">Departure Time:</label>
                                            <Datetime
                                                name="departure_time"
                                                value={newEntity.departure_time}
                                                onChange={handleDatetimeChange}
                                                inputProps={{ id: 'departure_time', readOnly: true }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">

                                            <label htmlFor="arrival_time">Arrival Time:</label>
                                            <Datetime
                                                name="arrival_time"
                                                value={newEntity.arrival_time}
                                                onChange={handleADatetimeChange}
                                                inputProps={{ id: 'arrival_time', readOnly: true }}
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
                                    placeholder="Filter Bus Reg No ..."
                                />
                            </div>
                        </div>
                    </div>
                    <DataTable
                        columns={dataColumns}
                        data={entities}
                        className="dark-table"
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


export default Schedule;