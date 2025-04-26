import { endOfMonth, format, startOfDay, startOfMonth } from 'date-fns';

// date

export const dateWithoutTime = (date) => {
    if (!date) return date;
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

export const convertDate = (date) => new Date(Date.parse(date)).toISOString();

export const daysInThisMonth = (date) => {
    const dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
};

export const currentMonth = (dateISO, increment, decrement) => {
    let year;
    let month;
    let date;
    if (!dateISO) {
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth();
    } else {
        date = new Date(dateISO);
        year = date.getFullYear();
        month = date.getMonth();
    }
    if (increment) {
        month += increment;
        if (month > 11) {
            month = 0;
            year += 1;
        }
        date = new Date(year, month);
    }
    if (decrement) {
        month -= decrement;
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        date = new Date(year, month);
    }
    const firstDay = `${new Date(year, month, 2).toISOString().slice(0, 10)}`; // T00:00:00.000Z
    const lastDay = `${new Date(year, month, 2)
        .toISOString()
        .slice(0, 8)}${daysInThisMonth(date)}`; // T23:59:59.000Z
    return { end: lastDay, start: firstDay };
};

export const getDatesFromRange = (dateRange) => {
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const dates = [];
    for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
    ) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        dates.push({ date: `${year}-${month}-${day}` });
    }
    return dates;
};

// format 20 марта 2021
export const fDateLocale = (date) =>
    new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

// format 20 мар 2021
export const fDateRuLocaleShort = (date) =>
    new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

// format 20.03.2021
export const fDateShort = (date) =>
    new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

export const fDateRuLocaleShortWithoutG = (date) =>
    new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    });

    export const fDateShortTime = (date) =>
    new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

// format 20 марта 17:20
export const fDateRuLocaleShortTime = (date) =>
    new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        year: 'numeric',
    });

export const toISOStringWithoutOffset = (date) => {
    if (typeof date === 'string') return date;
    const dateWithoutOffset = new Date(
        date.getTime() - date.getTimezoneOffset() * 60 * 1000,
    );
    return dateWithoutOffset.toISOString();
};

export const startDayAndMinusOffset = (date) => {
    const newValueZeroHour = startOfDay(date);
    return toISOStringWithoutOffset(newValueZeroHour);
};

export const setDateToFirstDayOfMonth = (date) => {
    const newDate = new Date(date);
    newDate.setDate(1);
    return newDate;
};

export const getStartAndPlusOneMonthByDate = (date) => {
    const start = setDateToFirstDayOfMonth(date);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);

    const startFormated = format(start, 'yyyy-MM-dd');
    const endFormated = format(end, 'yyyy-MM-dd');
    return { endFormated, startFormated };
};

export const getZeroTimeShortISODateWithoutOffset = (date) => {
    const isoStartDay = startDayAndMinusOffset(date);

    return format(new Date(isoStartDay), 'yyyy-MM-dd');
};

export const getDataFolderRangeWithRestriction = ({ end, start }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Calculate the difference in months
    const monthDiff =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

    // Check if the difference is more than or equal to one month
    if (monthDiff >= 1) {
        // Add one month to the start date
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(startDate.getDate());
    }

    // Convert the dates back to ISO string format
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();

    return {
        end: endDateString.slice(0, 10),
        start: startDateString.slice(0, 10),
    };
};

// colors

export function hexToRGB(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
}

export const getStatusColor = (id) => {
    switch (id) {
        case 2:
            return 'warning';
        case 3:
            return 'success';
        case 4:
            return 'error';
        default:
            return 'default';
    }
};

export const addAlpha = (color, opacity) => {
    // coerce values so ti is between 0 and 1.
    const sliceColor = color.slice(1);
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return `#${sliceColor}${_opacity.toString(16).toUpperCase()}`;
};

export const getWarehouseColorById = (warehouses, id) => {
    if (warehouses) {
        return warehouses.find((item) => item.id === Number(id))?.bgColor;
    }
    return '#808080';
};

export const getColorById = (id) => {
    switch (id) {
        case 2:
            return 'success';
        case 3:
            return 'error';
        case 4:
            return 'warning';
        case 5:
            return 'info';
        default:
            return 'default';
    }
};
// todo: refactor
export const getCityColor = (id) => {
    switch (id) {
        case 2:
            return '#00AB55';
        case 3:
            return '#FF4842';
        case 4:
            return '#FFC107';
        case 5:
            return '#1890FF';
        default:
            return '#FFC107';
    }
};

// other calc
export const calcSubrent = (arr) => {
    if (!arr) {
        return 0;
    }
    const result = arr.reduce(
        (acc, { qttSubrent, reserveSubrent }) =>
            acc + Number(qttSubrent) + Number(reserveSubrent),
        0,
    );
    return result;
};

export const userFullName = (user) => {
    if (!user) return '';
    return `${user?.firstName} ${user?.lastName}`;
};

export const getFirstAndLastDayOfMonth = (input) => {
    const date = typeof input === 'string' ? new Date(input) : input;
    // Get the first day of the month
    const firstDayOfMonth = startOfMonth(date);
    // Get the last day of the month
    const lastDayOfMonth = endOfMonth(date);

    // Format both dates to 'YYYY-MM-DD' format
    const firstDayMonth = format(firstDayOfMonth, 'yyyy-MM-dd');
    const lastDayMonth = format(lastDayOfMonth, 'yyyy-MM-dd');

    return { firstDayMonth, lastDayMonth };
};
