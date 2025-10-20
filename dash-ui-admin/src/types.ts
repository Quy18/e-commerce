// =========================================== Kiểu dữ liệu Api ======================================
export interface ApiError {
  message: string;
  status: number;
  statusText?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (data: LoginRequest) => Promise<void>;
  // registerUser: (data: RegisterRequest) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export interface UserResponeUpdate {
  message: string;
  user: User;
  imageurl: string;
}

export interface UserApiType {
  user: User | null;
  updateUser: (data: FormData) => Promise<void>;
}

// 🔹 Global Context (gom nhiều store)
export interface GlobalContextType {
  auth: AuthContextType;
  stat: StatType | null;
}

export interface StatType {
  // message: string,
  users: number,
  products: number,
  orders: number,
  coupons: number,
}

export interface StatApiType {
  getStats: () => Promise<StatType>;
}
//Một User đơn lẻ
export interface UserItemType {
  id: number,
  name: string,
  email: string,
  image: string,
  role: string,
  status: string,
  created_at: string
};

// Dữ liệu phân trang chứa mảng user
export interface UserPaginationType {
  current_page: number;
  data: UserItemType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Toàn bộ response trả về từ API
export interface UserManageType {
  message: string;
  data: UserPaginationType;
}

export interface UsersManageApiType {
  getAllUser: () => Promise<UserManageType>;
}
// ================================ Kiểu dữ liệu cho các đối tượng =========================================
// 🔹 Kiểu dữ liệu User
export interface User {
  id?: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  image?: File | null;
}

// 🔹 Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

// 🔹 Product
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

// 🔹 Cart
export interface CartItem {
  product: Product;
  quantity: number;
}

// 🔹 Order
export interface Order {
  id: number;
  user: User;
  items: CartItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  createdAt: string;
}

// Kiểu dữ liệu cho file ảnh avatar
export type FileType = {
  file: File;
  preview: string;
};

export interface NotificationProps {
  id: string;
  sender: string;
  message: string;
}

export interface ChildrenItemProps {
  id: string;
  title?: string;
  name?: string;
  link: string;
  children?: ChildrenItemProps[];
  icon?: string;
  badge?: string;
  badgecolor?: string;
}

export interface DashboardMenuProps {
  id: string;
  title: string;
  link?: string;
  grouptitle?: boolean;
  children?: ChildrenItemProps[];
  icon?: string;
  badge?: string;
  badgecolor?: string;
}

export interface CustomToggleProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface TeamsDataProps {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActivity: string;
  image: string;
}

export interface ActiveProjectsDataProps {
  id: number;
  projectName: string;
  priority: string;
  priorityBadgeBg: string;
  hours: number;
  progress: number;
  brandLogo: string;
  brandLogoBg: string;
  members: {
    image: string;
  }[];
}

export interface ProjectsStatsProps {
  id: number;
  title: string;
  value?: number | string;
  icon: React.ReactNode;
  // statInfo: string;
}

export interface ProjectContriProps {
  id: number;
  projectName: string;
  description: string;
  brandLogo: string;
  brandLogoBg: string;
  members: {
    image: string;
  }[];
}

export interface StandardProps {
  plantitle: string;
  description: string;
  monthly: number;
  buttonText: string;
  buttonClass: string;
  featureHeading: string;
  features: {
    feature: string;
  }[];
}

export interface FAQsProps {
  id: number;
  question: string;
  answer: string;
}

export interface FeaturesDataProps {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ChildrenItemProps {
  id: string;
  title?: string;
  name?: string;
  link: string;
  children?: ChildrenItemProps[];
  icon?: string;
  badge?: string;
  badgecolor?: string;
}

export interface DashboardMenuProps {
  id: string;
  title: string;
  link?: string;
  grouptitle?: boolean;
  children?: ChildrenItemProps[];
  icon?: string;
  badge?: string;
  badgecolor?: string;
}
