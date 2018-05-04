/**
 * Sample root level component
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomsDetailsList from "./lists/CustomsDetailsList"
import {FieldArray, getFormValues, reduxForm} from "redux-form"
import {Button, Toolbar, Typography, withStyles} from "material-ui"
import {connect} from "react-redux"
import {loadJson} from '../reducers/quote'
import templateRequest from '../data/template-request'
import PackageDetails from "./compound/PackageDetails"
import CollapseWrapper from "./wrappers/CollapseWrapper"
import Address from "./compound/Address"
import Authentication from "./compound/Authentication"
import General from "./compound/General"
import LoadJsonRequestDialog from "./dialogs/LoadJsonRequestDialog"
import AlertDialog from "./dialogs/AlertDialog"
import cookie from "react-cookies"
import {AccountCircle, FlightLand, FlightTakeoff, ShoppingCart} from "material-ui-icons"

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    loadButton: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    sendButton: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    header: {
        marginBottom: theme.spacing.unit * 2,
    },
})

class QuoteForm extends Component {
    state = {dialogOpen: false, alertOpen: false, prevEnv: null}

    static contextTypes = {
        store: PropTypes.object,
    }

    componentDidMount() {
        const {loadJson, env} = this.props
        const data = {
            customsDetails: [{}], request: {
                xExtUser: cookie.load(env + '.xExtUser')
            }
        }
        loadJson(data)
    }

    componentWillReceiveProps() {
        this.setState({
            prevEnv: this.props.env
        })
    }

    get values() {
        const {store} = this.context
        const state = store.getState()
        return getFormValues('quote')(state)
    }

    handleDialogOpen = () => {
        this.setState({dialogOpen: true})
    }
    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }
    handleOnLoadClick = (json) => {
        const {loadJson} = this.props
        try {
            const formValues = this.values
            let data = JSON.parse(json)
            data.request = formValues.request
            loadJson(data)
            this.handleDialogClose()
        } catch (e) {
            console.error(e)
            this.handleDialogClose()
            this.handleAlertOpen()
        }
    }
    handleAlertOpen = () => {
        this.setState({alertOpen: true})
    }
    handleAlertClose = () => {
        this.setState({alertOpen: false})
    }

    render() {
        const {classes, handleSubmit, showAuthorization, env, loadJson} = this.props

        if (this.state.prevEnv !== env) {
            let data = Object.assign({}, this.values)
            data.request = {
                xExtUser: cookie.load(env + '.xExtUser')
            }
            loadJson(data)
        }

        return (
            <form onSubmit={handleSubmit}>
                <Toolbar disableGutters={true}>
                    <Button variant="raised" size="medium" color="primary" className={classes.loadButton}
                            onClick={() => this.handleOnLoadClick(JSON.stringify(templateRequest))}>Load
                        template</Button>
                    <Button variant="raised" size="medium" color="primary" className={classes.loadButton}
                            onClick={this.handleDialogOpen}>Load request from JSON</Button>
                    <Button variant="raised" size="medium" color="secondary" type="submit"
                            className={classes.sendButton}>Send</Button>
                </Toolbar>
                <Typography variant="title" className={classes.header}>Fill in qoute data</Typography>

                <CollapseWrapper label="AuthenticationField" icon={<AccountCircle/>}>
                    <Authentication showAuthorization={showAuthorization}/>
                </CollapseWrapper>

                <FieldArray name="customsDetails" component={CustomsDetailsList}/>
                <CollapseWrapper label="Package details" icon={<ShoppingCart/>}><PackageDetails
                    member="packageDetails"/></CollapseWrapper>
                <CollapseWrapper label="Consignee address" icon={<FlightLand/>}> <Address
                    member="consigneeAddress"/></CollapseWrapper>
                <CollapseWrapper label="Sender address" icon={<FlightTakeoff/>}> <Address
                    member="senderAddress"/></CollapseWrapper>

                <General/>

                <Button variant="raised" size="large" color="secondary" type="submit"
                        className={classes.sendButton}>Send</Button>

                <LoadJsonRequestDialog open={this.state.dialogOpen} onClose={this.handleDialogClose}
                                       onLoadClick={(json) => this.handleOnLoadClick(json)}/>

                <AlertDialog open={this.state.alertOpen} onClose={this.handleAlertClose} title="Error"
                             message="Invalid json"/>
            </form>
        )
    }
}

QuoteForm = reduxForm({
    form: 'quote',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(QuoteForm)

QuoteForm = connect(
    state => ({
        initialValues: state.quote.data,
        env: state.env.current
    }),
    {loadJson},
)(QuoteForm)

QuoteForm.propTypes = {
    classes: PropTypes.object.isRequired,
    showAuthorization: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(QuoteForm)