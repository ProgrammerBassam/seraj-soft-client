type UserInfo = {
  name: string; // The user's name
  phone: string; // The user's phone number
  profilePicture?: string; // URL to the profile picture
};

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      onQRCode: (callback: (qrCode: string) => void) => void;
      onStatusChange: (callback: (status: 'connecting' | 'connected' | 'disconnected') => void) => void;
      onUserInfo: (callback: (userInfo: UserInfo) => void) => void;
      reconnect: () => void;
      clearSession: () => void;
      getLastStatus: () => void;
      sendNotification: (title: string, body: string) => void;
    }
  }
}