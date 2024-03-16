module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                notEmpty: true
            }
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

    })

    return Review;
}