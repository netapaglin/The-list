class Config { }

class DevelopmentConfig extends Config {
    public isDevelopment = true;
    public connectionString = "mongodb://localhost:27017/the-list";
}

class ProductionConfig extends Config {
    public isDevelopment = false;
    public connectionString = "mongodb://localhost:27017/the-list";

}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;
