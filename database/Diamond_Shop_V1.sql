CREATE DATABASE Diamond_Shop_V1;
GO

USE Diamond_Shop_V1;
GO

CREATE TABLE Role (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(255)
);
GO

CREATE TABLE Jewelry (
    JewelryID INT PRIMARY KEY
);
GO

CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Username VARCHAR(255),
    Password VARCHAR(255),
    Email VARCHAR(255),
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);
GO

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    PhoneNumber VARCHAR(255),
    Address VARCHAR(255),
    Sex CHAR(1),
    DateOfBirth DATE,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

CREATE TABLE Designer (
    DesignerID INT PRIMARY KEY,
    PhoneNumber VARCHAR(255),
    Address VARCHAR(255),
    UserID INT,
    DesignID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

CREATE TABLE Diamond (
    DiamondID INT PRIMARY KEY,
    Name VARCHAR(255),
    Shape VARCHAR(255),
    Cut VARCHAR(255),
    Color VARCHAR(255),
    Clarity VARCHAR(255),
    CaratWeight FLOAT,
    Fluorescence VARCHAR(255),
    LengthWidthRatio FLOAT,
    Depth FLOAT,
    Tables FLOAT,
    Symmetry VARCHAR(255),
    Girdle VARCHAR(255),
    Measurements VARCHAR(255),
    Certificate VARCHAR(255),
    Price FLOAT,
    Description VARCHAR(255)
);
GO

CREATE TABLE Product (
    ProductID INT PRIMARY KEY,
    DesignID INT,
    JewelryID INT,
    DiamondID INT,
    DesignerID INT,
    DateCreate DATE,
    FOREIGN KEY (DesignID) REFERENCES Designer(DesignerID),
    FOREIGN KEY (JewelryID) REFERENCES Jewelry(JewelryID),
    FOREIGN KEY (DiamondID) REFERENCES Diamond(DiamondID),
    FOREIGN KEY (DesignerID) REFERENCES Designer(DesignerID)
);
GO

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    TotalPrice FLOAT,
    OrderDate DATE,
    OrderDetailID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
GO

CREATE TABLE OrderDetail (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
GO

ALTER TABLE Orders ADD FOREIGN KEY (OrderDetailID) REFERENCES OrderDetail(OrderDetailID);
GO

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY,
    OrderID INT,
    AmountPaid FLOAT,
    Deposit FLOAT,
    DatePaid DATE,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
GO

CREATE TABLE Invoice (
    InvoiceID INT PRIMARY KEY,
    PaymentID INT,
    Products VARCHAR(255),
    Quantity INT,
    Total FLOAT,
    Deposit FLOAT,
    AmountPaid FLOAT,
    FOREIGN KEY (PaymentID) REFERENCES Payment(PaymentID)
);
GO

CREATE TABLE Staff (
    SalesStaffID INT PRIMARY KEY,
    PhoneNumber VARCHAR(255),
    Address VARCHAR(255),
    OrderID INT,
    UserID INT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

CREATE TABLE Manager (
    ManagerID INT PRIMARY KEY,
    PhoneNumber VARCHAR(255),
    Address VARCHAR(255),
    UserID INT,
    ProductID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
GO

CREATE TABLE Ring (
    RingID INT PRIMARY KEY,
    RingName VARCHAR(255),
    JewelryID INT,
    Type VARCHAR(255),
    Width FLOAT,
    Shape VARCHAR(255),
    Quantity INT,
    TotalCaratAverage FLOAT,
    Color CHAR(1),
    Clarity VARCHAR(255),
    Price FLOAT,
    Description VARCHAR(255),
    FOREIGN KEY (JewelryID) REFERENCES Jewelry(JewelryID)
);
GO

CREATE TABLE Necklaces (
    NecklacesID INT PRIMARY KEY,
    NecklacesName VARCHAR(255),
    JewelryID INT,
    Type VARCHAR(255),
    ChainType VARCHAR(255),
    ChainLength FLOAT,
    ClaspType VARCHAR(255),
    Shape VARCHAR(255),
    Quantity INT,
    TotalCaratAverage FLOAT,
    Color CHAR(1),
    Clarity VARCHAR(255),
    EnhancementType VARCHAR(255),
    Price FLOAT,
    Description VARCHAR(255),
    FOREIGN KEY (JewelryID) REFERENCES Jewelry(JewelryID)
);
GO

CREATE TABLE Tracklog (
    TracklogID INT PRIMARY KEY,
    DesignID INT,
    DesignerID INT,
    Date DATE,
    Picture VARCHAR(255),
    FOREIGN KEY (DesignID) REFERENCES Designer(DesignerID),
    FOREIGN KEY (DesignerID) REFERENCES Designer(DesignerID)
);
GO

CREATE TABLE DesignSpace (
    DesignID INT PRIMARY KEY,
    DesignerID INT,
    TracklogID INT,
    CustomerID INT,
    FOREIGN KEY (DesignerID) REFERENCES Designer(DesignerID),
    FOREIGN KEY (TracklogID) REFERENCES Tracklog(TracklogID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
GO

CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY,
    UserID INT,
    Comment VARCHAR(255),
    InvoiceID INT,
    Rating FLOAT,
    FeedbackDate DATE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (InvoiceID) REFERENCES Invoice(InvoiceID)
);
GO

CREATE TABLE EducationalContent (
    DesignID INT PRIMARY KEY,
    DesignerID INT,
    TracklogID INT,
    CustomerID INT,
    FOREIGN KEY (DesignerID) REFERENCES Designer(DesignerID),
    FOREIGN KEY (TracklogID) REFERENCES Tracklog(TracklogID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
GO

CREATE TABLE ContactSupport (
    GuestID INT PRIMARY KEY,
    Email VARCHAR(255),
    PhoneNumber VARCHAR(255),
    SalesStaffID INT,
    FOREIGN KEY (SalesStaffID) REFERENCES Staff(SalesStaffID)
);
GO
