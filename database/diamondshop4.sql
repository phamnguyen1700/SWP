-- Create Roles table
CREATE TABLE Roles (
  RoleID INT PRIMARY KEY IDENTITY(1,1),
  RoleName NVARCHAR(50) NOT NULL
);
GO

-- Create Users table
CREATE TABLE Users (
  UserID INT PRIMARY KEY IDENTITY(1,1),
  RoleID INT,
  Username NVARCHAR(50) NOT NULL,
  Password NVARCHAR(50) NOT NULL,
  Email NVARCHAR(255) NOT NULL,
  Name NVARCHAR(100),
  PhoneNumber NVARCHAR(20),
  Address NVARCHAR(255),
  Sex NVARCHAR(5),
  DateOfBirth DATE,
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);
GO

-- Create ProductTypes table
CREATE TABLE ProductTypes (
  ProductTypeID INT PRIMARY KEY IDENTITY(1,1),
  ProductTypeName NVARCHAR(50) NOT NULL
);
GO

-- Create Diamond table
CREATE TABLE Diamond (
  DiamondID INT PRIMARY KEY IDENTITY(1,1),
  Shape NVARCHAR(50),
  Cut NVARCHAR(50),
  Color NVARCHAR(50),
  Clarity NVARCHAR(50),
  CaratWeight DECIMAL(10, 2),
  Fluorescence NVARCHAR(50),
  LengthWidthRatio DECIMAL(10, 2),
  Depth DECIMAL(10, 2),
  Tables DECIMAL(10, 2),
  Symmetry NVARCHAR(50),
  Girdle NVARCHAR(50),
  Measurements NVARCHAR(255),
  Certificate NVARCHAR(255)
);
GO

-- Create Product table
CREATE TABLE Product (
  ProductID INT PRIMARY KEY IDENTITY(1,1),
  ProductName NVARCHAR(255),
  ProductType INT,
  Type NVARCHAR(50),
  Size NVARCHAR(50),
  Description NVARCHAR(MAX),
  Price DECIMAL(10, 2),
  Quantity INT,
  DiamondID INT,
  Image1 NVARCHAR(MAX), -- Hình ảnh 1
  Image2 NVARCHAR(MAX), -- Hình ảnh 2
  Image3 NVARCHAR(MAX), -- Hình ảnh 3
  FOREIGN KEY (ProductType) REFERENCES ProductTypes(ProductTypeID),
  FOREIGN KEY (DiamondID) REFERENCES Diamond(DiamondID)
);
GO

-- Create Customer table
CREATE TABLE Customer (
  CustomerID INT PRIMARY KEY IDENTITY(1,1),
  UserID INT UNIQUE,
  DateJoined DATE NOT NULL,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Create Orders table
CREATE TABLE Orders (
  OrderID INT PRIMARY KEY IDENTITY(1,1),
  CustomerID INT,
  TotalPrice DECIMAL(10, 2),
  OrderDate DATE,
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
GO

-- Create OrderDetails table
CREATE TABLE OrderDetails (
  OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
  OrderID INT,
  ProductID INT,
  ProductName NVARCHAR(255),
  ProductPrice DECIMAL(10, 2),
  Quantity INT,
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
GO

-- Create Payment table
CREATE TABLE Payment (
  PaymentID INT PRIMARY KEY IDENTITY(1,1),
  OrderID INT,
  Deposit DECIMAL(10, 2),
  AmountPaid DECIMAL(10, 2),
  Total DECIMAL(10, 2),
  DatePaid DATE,
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
GO

-- Create Feedback table
CREATE TABLE Feedback (
  FeedbackID INT PRIMARY KEY IDENTITY(1,1),
  CustomerID INT,
  FeedbackText NVARCHAR(1000),
  Rating INT CHECK (Rating >= 1 AND Rating <= 5),
  FeedbackDate DATE,
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
GO



