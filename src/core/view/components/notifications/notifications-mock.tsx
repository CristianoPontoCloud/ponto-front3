import {
	NotificationReadStatusEnum,
	NotificationTypeEnum,
	type NotificationsMonth,
	type NotificationsResponse,
} from "@/domain/entities/notifications";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";

function getRandomNotificationType(): NotificationTypeEnum {
	const values = Object.values(NotificationTypeEnum); // array com os valores do enum
	const randomIndex = Math.floor(Math.random() * values.length);
	return values[randomIndex];
}

// const notReadNotifications: NotificationItemLayout[] = Array.from({
// 	length: faker.number.int({ min: 1, max: 10 }),
// }).map(() => {
// 	return mockNotification(NotificationReadStatusEnum.NOT_READ, getRandomNotificationType());
// });
// const readNotifications: NotificationItemLayout[] = Array.from({
// 	length: faker.number.int({ min: 1, max: 10 }),
// }).map(() => {
// 	return mockNotification(NotificationReadStatusEnum.READ, getRandomNotificationType());
// });

function generateMockMonths(readStatus: NotificationReadStatusEnum): NotificationsMonth[] {
	const result: NotificationsMonth[] = [];
	const today = new Date();
	const totalMonths = faker.number.int({ min: 1, max: 12 });

	for (let i = 0; i < totalMonths; i++) {
		const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();

		const createdAt = () => {
			return new Date(
				year,
				date.getMonth(),
				faker.number.int({ min: 1, max: 28 }),
				faker.number.int({ min: 0, max: 23 }),
				faker.number.int({ min: 0, max: 59 }),
				faker.number.int({ min: 0, max: 59 }),
			);
		};

		result.push({
			month: `${month}-${year}`,
			notifications: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => {
				return {
					id: v4(),
					name: faker.commerce.productName(),
					createdAt: createdAt(),
					type: getRandomNotificationType(),
					fileId: v4(),
					messageId: v4(),
					occurrenceId: v4(),
					requestId: v4(),
					readStatus,
				};
			}),
		});
	}

	return result;
}

export function mockNotificationsResponse(): NotificationsResponse {
	return {
		notReadNotifications: generateMockMonths(NotificationReadStatusEnum.NOT_READ),
		readNotifications: generateMockMonths(NotificationReadStatusEnum.READ),
	};
}
