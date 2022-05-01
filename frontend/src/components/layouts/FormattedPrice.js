import React, { Fragment } from 'react'

const FormattedPrice = ({ number }) => {

    return (

        <Fragment>

            <span className="whitespace-nowrap">

                {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} THB

            </span>

        </Fragment>

    )

}

export default FormattedPrice
