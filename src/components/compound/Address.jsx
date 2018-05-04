/**
 * Sample reusable compound component
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field} from "redux-form"
import {Grid, withStyles} from "material-ui"
import TextFieldWrapper from "../wrappers/TextFieldWrapper"

const styles = (theme) => ({
    mainContainer: {
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2
    }
})

class Address extends Component {

    render() {
        const {classes, member} = this.props
        return (
            <div className={classes.mainContainer}>
                <Grid container spacing={16} justify="flex-start">
                    <Grid item xs={12} sm={4} md={2}>
                        <Field
                            name={`${member}.state`}
                            component={TextFieldWrapper}
                            label="State"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <Field
                            name={`${member}.country`}
                            component={TextFieldWrapper}
                            required
                            label="Country"
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Address.propTypes = {
    classes: PropTypes.object.isRequired,
    member: PropTypes.string.isRequired
}

export default withStyles(styles)(Address)