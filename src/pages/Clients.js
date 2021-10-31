import React, {useEffect, useRef, useState} from "react"
import {fetchClients, createClients, deleteClients, editClients} from "../redux/actions/clients.action"
import {connect} from "react-redux"
import {Row, Col , message, Form, Input, Modal, Table, Radio} from "antd"
import Button from "antd-button-color"
import "../css/Clients.css"

const Clients = ({fetchClients, createClients, deleteClients, editClients, clients}) => {

    const formRef = useRef(null)

    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        !clients.length && fetchClients()
    }, [clients])

    const columns = [
        {
            title: 'Code',
            width: 100,
            dataIndex: 'code',
            key: 'code',
            fixed: 'left',
        },

        {
            title: 'Short_name',
            width: 100,
            dataIndex: 'short_name',
            key: 'short_name',
            fixed: 'left',
        },

        {
            title: 'Long name Uz',
            dataIndex: 'long_name_uz',
            key: "address_uz",
            render: (text, record) => record.long_name.uz
        },

        {
            title: 'Long name Ru',
            dataIndex: 'long_name_ru',
            key: "address_ru",
            render: (text, record) => record.long_name.ru
        },

        {
            title: 'Long name En',
            dataIndex: 'long_name_en',
            key: "address_en",
            render: (text, record) => record.long_name.en
        },

        {
            title: 'Satatus',
            key: "status",
            dataIndex: 'status'
        },

        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => <Button
                type="primary"
                danger
                onClick={() => {
                    handleDelete(record.code)
                    info()
                }}
            >Delete</Button>,
        },

        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) =>
                <Button
                    type="primary"
                    success
                    onClick={() => {
                        setVisible(true)
                        setIsEdit(true)
                        handleEdit(record)
                        }
                    }
                >
                    Edit
                </Button>,
        },
    ];

    const onReset = () => {
        formRef.current.resetFields();
    }

    const success = () => {
        message.success('Something added');
    }

    const info = () => {
        message.info('Something deleted');
    }

    const onFinish = values => {
        const params = {
            active: values.active,
            code: values.code,
            short_name: values.short_name,
            status: values.status,
            long_name: {
                uz: values.long_name_uz,
                ru: values.long_name_ru,
                en: values.long_name_en
            }
        }
        !isEdit ? createClients(params) : editClients(params)
    }

    const handleDelete = code => {
        deleteClients(code)
    }

    const handleEdit = (record) =>{
        setTimeout(()=>{
            formRef.current.setFieldsValue({
                code: record.code,
                short_name: record.short_name,
                status: record.status,
                active:record.active,
                long_name_uz:record.long_name.uz,
                long_name_ru:record.long_name.ru,
                long_name_en:record.long_name.en,
            })
        },100)
    }

    return (
        <React.Fragment>
            <Row>
                <Col span={6}>
                    <Button
                        className="create_btn"
                        type="primary"
                        onClick={() => {setVisible(true)}}
                    >
                        Create
                        Client
                    </Button>
                </Col>
            </Row>

            <Modal title="Clients"
                   centered
                   visible={visible}
                   onOk={() => {
                       setVisible(false)
                       onReset()
                   }}
                   onCancel={() => setVisible(false)}
                   width={1000}>

                <Form ref={formRef} onFinish={onFinish}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Short name"
                                name="short_name"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Активный"
                                name="active"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Radio.Group defaultValue={true} buttonStyle="solid">
                                    <Radio.Button value={true}>Активный</Radio.Button>
                                    <Radio.Button value={false}>Не активный</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col offset={2} span={10}>
                            <Form.Item
                                label="Long name uz"
                                name="long_name_uz"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Long name ru"
                                name="long_name_ru"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Long name en"
                                name="long_name_en"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="end">
                        <Col span={4}>
                            <div className="create_row">
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        onClick={() => {
                                            success()
                                        }}
                                    >
                                        {!isEdit? 'Create' : 'Edit'}
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        danger
                                        htmlType="submit"
                                        onClick={() => {
                                            onReset()
                                        }}
                                    >
                                        Reset
                                    </Button>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Table
                bordered={true}
                columns={columns}
                pagination={{pageSize: 10}}
                dataSource={clients}
                scroll={{x: 1300}}
                size='small'
            />
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    clients: state.clients.clients
})

const mapDispatchToProps = {
    fetchClients,
    createClients,
    deleteClients,
    editClients
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);