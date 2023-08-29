import { api } from '../services/api';

export const formatDate = (date: string) => {
	const d = new Date(date);
	d.setHours(d.getHours() - 3);

	const [isoDate, timeWithMS] = d.toISOString().split('T');

	const [year, month, day] = isoDate.split('-');
	const [time] = timeWithMS.split('.');
  
	return `${month}/${day}/${year} ${time}`;
};

export async function exportChatCSV(chatHistoryId: string, createdAt: string, userName: string) {
	try {
		const response = await api.get(`/exportCSV/${chatHistoryId}`, {
			responseType: 'blob',
		});

		const blob = new Blob([response.data], { type: 'text/csv' });

		// Create a temporary URL for the Blob.
		const url = window.URL.createObjectURL(blob);

		// Create a link (anchor) in the DOM with the file name.
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Conversation ${userName} - ${new Date(createdAt).toISOString()}.csv`);

		// Fire a click event on the link to start the download.
		link.click();

		// Clear the temporary URL when it is no longer needed.
		window.URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error downloading CSV', error);
	}
}

