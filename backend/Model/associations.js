export const initializeAssociations = async () => {
    const { Users } = await import("./UserModel.js");
    const { Bookings } = await import("./BookingModel.js");
    const { Listings } = await import("./ListingModel.js");

    // Users -> Bookings (one user has many bookings)
    Users.hasMany(Bookings, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    Bookings.belongsTo(Users, {
        foreignKey: "userId"
    });

    // Listings -> Bookings (one listing has many bookings)
    Listings.hasMany(Bookings, {
        foreignKey: "listingId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    Bookings.belongsTo(Listings, {
        foreignKey: "listingId"
    });

    // Users -> Listings (one user/host has many listings)
    Users.hasMany(Listings, {
        foreignKey: "hostId",
        as: "hosted_listings",
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    });

    Listings.belongsTo(Users, {
        foreignKey: "hostId",
        as: "host"
    });
};