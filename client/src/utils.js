import moment from "moment";

export const orderCreateByDateWithMoment = (array) => {
    return array.sort(function (element1, element2) {
        const time1 = moment(element1.createdAt).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
        );
        const time2 = moment(element2.createdAt).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
        );
        if (time1 > time2) {
            return 1;
        } else {
            return -1;
        }
    });
};
