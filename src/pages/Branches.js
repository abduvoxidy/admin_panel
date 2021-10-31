import React, {useEffect, useState, useRef} from "react"
import {message, Form, Input, Modal, Table, Radio, Row, Col} from "antd"
import {fetchBranches, createBranches, deleteBranches, editBranches} from "../redux/actions/branches.action"
import {connect} from "react-redux"
import Button from "antd-button-color"

const Branches = ({fetchBranches, createBranches, deleteBranches, branches, editBranches}) => {

    const formRef = useRef(null);

    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        fetchBranches()
    }, [fetchBranches])


    const handleDelete = code => {
        deleteBranches(code)
    }

    const handleEdit = record => {
        setTimeout(() => {
            formRef.current.setFieldsValue({
                code: record.code,
                mfo: record.mfo,
                active: record.active,
                address_uz: record.address.uz,
                address_ru: record.address.ru,
                address_en: record.address.en,
                title_uz: record.title.uz,
                title_ru: record.title.ru,
                title_en: record.title.en
            })
        }, 100)
    }

    const info = () => {
        message.info('Something deleted')
    }

    const success = () => {
        message.success('Something added')
    }

    const onReset = () => {
        formRef.current.resetFields()
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
            title: 'Mfo',
            width: 100,
            dataIndex: 'mfo',
            key: 'mfo',
            fixed: 'left',
        },

        {
            title: 'Address Uz',
            dataIndex: 'address_uz',
            key: "address_uz",
            render: (text, record) => record.address.uz
        },

        {
            title: 'Address Ru',
            dataIndex: 'address_ru',
            key: "address_ru",
            render: (text, record) => record.address.ru
        },

        {
            title: 'Address En',
            dataIndex: 'address_en',
            key: "address_en",
            render: (text, record) => record.address.en
        },

        {
            title: 'Title Uz',
            key: "code",
            render: (text, record) => record.title.uz
        },

        {
            title: 'Title Ru',
            key: "code",
            render: (text, record) => record.title.ru
        },

        {
            title: 'Title En',
            key: "code",
            render: (text, record) => record.title.en
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
            render: record =>
                <Button type="primary"
                        onClick={() => {
                            setVisible(true)
                            setIsEdit(true)
                            handleEdit(record)
                        }}
                >
                    Edit
                </Button>,
        },
    ];


    const onFinish = (values) => {
        const params = {
            active: values.active,
            address: {
                uz: values.address_uz,
                ru: values.address_ru,
                en: values.address_en
            },
            code: values.code,
            mfo: values.mfo,
            title: {
                uz: values.title_uz,
                ru: values.title_ru,
                en: values.title_en
            }
        }
        !isEdit ? createBranches(params) : editBranches(params)
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
                        Maritial
                    </Button>
                </Col>
            </Row>

            <Modal
                title="Branches"
                centered
                visible={visible}
                onOk={() => {
                    setVisible(false)
                    onReset()
                }}
                onCancel={() => setVisible(false)}
                width={1000}
            >
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
                                label="Address Uz"
                                name="address_uz"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>

                            <Form.Item
                                label="Address Ru"
                                name="address_ru"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Address En"
                                name="address_en"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="MFO"
                                name="mfo"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>

                            <Form.Item
                                label="Title Uz"
                                name="title_uz"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>

                            <Form.Item
                                label="Title Ru"
                                name="title_ru"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Title En"
                                name="title_en"
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
                    </Row>
                    <Row justify="end">
                        <Col span={4}>
                            <div className="create_row">
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        onClick={() => {success()}}
                                    >
                                        {!isEdit ? 'Create' : 'Edit'}
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        danger
                                        htmlType="submit"
                                        onClick={() => {onReset()}}
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
                dataSource={branches}
                scroll={{x: 1300}}
                size='small'
            />

        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    branches: state.branches.branches
})

const mapDispatchToProps = {
    fetchBranches,
    createBranches,
    deleteBranches,
    editBranches
}

export default connect(mapStateToProps, mapDispatchToProps)(Branches);