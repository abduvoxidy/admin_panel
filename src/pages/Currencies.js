import React, {useEffect, useRef, useState} from "react"
import {connect} from "react-redux"
import {fetchCurrencies, createCurrencies, deleteCurrencies, editCurrencies} from "../redux/actions/currencies.action"
import Button from "antd-button-color"
import {Col, Form, Input, message, Modal, Radio, Row, Table} from "antd"
import "../css/Clients.css"

const Currencies = ({fetchCurrencies, createCurrencies, deleteCurrencies, editCurrencies, currencies}) => {

    const formRef = useRef(null)

    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        fetchCurrencies()
    }, [fetchCurrencies])

    const onReset = () => {
        formRef.current.resetFields()
    }

    const success = () => {
        message.success('Something added')
    }

    const info = () => {
        message.info('Something deleted')
    }

    const onFinish = values => {
        const params = {
            active: values.active,
            code: values.code,
            cur_code: values.cur_code,
            name: {
                uz: values.name_uz,
                ru: values.name_ru,
                en: values.name_en
            }
        }
        !isEdit ? createCurrencies(params) : editCurrencies(params)
    }

    const handleDelete = code => {
        deleteCurrencies(code)
    }

    const handleEdit = record =>{
        setTimeout(()=>{
            formRef.current.setFieldsValue({
                code: record.code,
                cur_code: record.cur_code,
                active:record.active,
                name_uz:record.name.uz,
                name_ru:record.name.ru,
                name_en:record.name.en,
            })
        },100)
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
            title: 'Cur code',
            width: 100,
            dataIndex: 'cur_code',
            key: 'cur_code',
            fixed: 'left',
        },

        {
            fixed: 'left',
            width: 150,
            title: 'name Uz',
            dataIndex: 'name_uz',
            key: "name_uz",
            render: (text, record) => record.name.uz
        },

        {
            fixed: 'left',
            width: 150,
            title: 'Name Ru',
            dataIndex: 'name_ru',
            key: "address_ru",
            render: (text, record) => record.name.ru
        },

        {
            fixed: 'left',
            width: 150,
            title: 'Name En',
            dataIndex: 'name_en',
            key: "address_en",
            render: (text, record) => record.name.en
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
                        setVisible(true)
                        setIsEdit(true)
                        handleEdit(record)
                    }}
                >
                    Edit
                </Button>,
        },
    ];

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
                        Currency
                    </Button>
                </Col>
            </Row>

            <Modal title="Currencies"
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
                                label="Cur code"
                                name="cur_code"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input placeholder="input with clear icon" allowClear/>
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

                        <Col offset={2} span={10}>
                            <Form.Item
                                label="Name uz"
                                name="name_uz"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Name ru"
                                name="name_ru"
                                rules={[{required: true, message: 'Обязательное поле'}]}
                            >
                                <Input size="small" placeholder="input with clear icon" allowClear/>
                            </Form.Item>
                            <Form.Item
                                label="Name en"
                                name="name_en"
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
                                        onClick={() => {success()}}
                                    >
                                        {!isEdit? 'Create' : 'Edit'}
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
                dataSource={currencies}
                size='small'
            />
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    currencies: state.currencies.currencies
})

const mapDispatchToProps = {
    fetchCurrencies,
    createCurrencies,
    deleteCurrencies,
    editCurrencies
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);