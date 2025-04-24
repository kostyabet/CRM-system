import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '../api';
import { USER_INFO_QUERY_KEY } from '../constants';

export const useUserInfo = () => {
    // return useQuery({
    //     queryFn: fetchUserInfo,
    //     queryKey: [USER_INFO_QUERY_KEY],
    //     select: (data) => enhanceUserData(data),
    // });
    return (
        {
            "id": 351,
            "login": "gaptar",
            "name": {
                "firstName": "Алексей",
                "lastName": "Гаптар",
                "patronymic": null,
                "fullName": "Алексей Гаптар",
                "avatar": "https://blackout.by/wp-content/uploads/2022/11/avatar6.png"
            },
            "role": {
                "id": 5,
                "name": "Тех. менеджер"
            },
            "contacts": {
                "phone1": "+79150572742",
                "phone2": "+375292471338",
                "email": "ag@blackoutstudio.ru"
            },
            "warehouse": {
                "id": 3,
                "name": "Москва"
            },
            "department": {
                "id": 2,
                "name": "Офис"
            }
        }
    )
};