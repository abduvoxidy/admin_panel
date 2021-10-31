import React, {useEffect, useRef, useState} from "react";
import {fetchMaritials, createMaritials, deleteMaritials, editMaritials} from "../redux/actions/maritials.action"
import {connect} from "react-redux"
import Button from "antd-button-color"
import {Col, Form, Input, message, Modal, Radio, Row, Table} from "antd"

const Maritials = ({fetchMaritials, createMaritials, deleteMaritials, editMaritials, maritials}) => {

    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        fetchMaritials()
    }, [fetchMaritials])

    const formRef = useRef(null)

    const onReset = () => {
        formRef.current.resetFields()
    }
    const info = () => {
        message.info('Something deleted')
    }

    const success = () => {
        message.success('Something added')
    }

    const onFinish = values => {
        const params = {
            code: values.code,
            active: values.active,
            gender: {
                uz: values.gender_uz,
                ru: values.gender_ru,
                en: values.gender_en
            },
            status: {
                uz: values.status_uz,
                ru: values.status_ru,
                en: values.status_en
            }
        }
        !isEdit ? createMaritials(params) : editMaritials(params)
    }
    const handleDelete = code => {
        deleteMaritials(code)
    }

    const handleEdit = record => {
        setTimeout(() => {
            formRef.current.setFieldsValue({
                code: record.code,
                active: record.active,
                gender_uz: record.gender.uz,
                gender_ru: record.gender.ru,
                gender_en: record.gender.en,
                status_uz: record.status.uz,
                status_ru: record.status.ru,
                status_en: record.status.en
            })

        }, 100)
    }

    const columns = [
        {
            title: 'Code',
            width: 100,
            dataIndex: 'code',
            key: 'code',
            fixed: 'left',
        },
        {
            title: 'Gender Uz',
            dataIndex: 'gender_uz',
            key: "gender_uz",
            render: (text, record) => record.gender.uz
        },

        {
            title: 'Gender Ru',
            dataIndex: 'gender_ru',
            key: "gender_ru",
            render: (text, record) => record.gender.ru
        },

        {
            title: 'Gender En',
            dataIndex: 'gender_en',
            key: "gender_en",
            render: (text, record) => record.gender.en
        },

        {
            title: 'Status Uz',
            dataIndex: 'status_uz',
            key: "status_uz",
            render: (text, record) => record.status.uz
        },

        {
            title: 'Status Ru',
            dataIndex: 'status_ru',
            key: "status_ru",
            render: (text, record) => record.status.ru
        },

        {
            title: 'Status En',
            dataIndex: 'status_en',
            key: "status_en",
            render: (text, record) => record.status.en
        },

        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => <Button
                onClick={() => {
                    handleDelete(record.code)
                    info()
                }}
                type="primary"
                danger
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
                    onClick={() => {
                        setIsEdit(true)
                        setVisible(true)
                        handleEdit(record)
                    }}
                >
                    Edit
                </Button>,
        },
    ];

    return (
        <div>
            <Row>
                <Col span={6}>
                    <Button
                        className="create_btn"
                        type="primary"
                        onClick={() => {setVisible(true)}}
                    >
                        Create
                        Maritial
                    </Button>
                </Col>
            </Row>
            <Modal title="Maritials"
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
                                label="Gender uz"
                                name="gender_uz"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Gender ru"
                                name="gender_ru"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Gender en"
                                name="gender_en"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                        </Col>

                        <Col offset={2} span={10}>
                            <Form.Item
                                label="Status uz"
                                name="status_uz"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>

                            <Form.Item
                                label="Status ru"
                                name="status_ru"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Status en"
                                name="status_en"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>

                            <Form.Item
                                label="Активный"
                                name="active"
                                rules={[{required: false, message: 'Обязательное поле'}]}
                            >
                                <Radio.Group defaultValue={true} buttonStyle="solid">
                                    <Radio.Button value={true}>Активный</Radio.Button>
                                    <Radio.Button value={false}>Не активный</Radio.Button>
                                </Radio.Group>
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
                                        {!isEdit ? 'Create' : 'Edit'}
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
                dataSource={maritials}
                scroll={{x: 1300}}
                size='small'
            />
        </div>
    );
};

const mapStateToProps = state => ({
    maritials: state.maritials.maritials
})

const mapDispatchToProps = {
    fetchMaritials,
    createMaritials,
    deleteMaritials,
    editMaritials
}

export default connect(mapStateToProps, mapDispatchToProps)(Maritials);