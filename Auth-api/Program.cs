using KillerBee;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<KillerBeeContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("KillerBeeDB")));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = configuration["Jwt:Audience"],
        ValidIssuer = configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]))
    };
    options.Events = new JwtBearerEvents()
    {
        // Verification steps applied once the token is proven to be signed by server
        OnTokenValidated = context =>
        {
            var dbContext = context.HttpContext.RequestServices.GetRequiredService<KillerBeeContext>();

            // Fail if context is not complete
            if (context.Principal == null)
            {
                context.Fail("Invalid token");
                return Task.CompletedTask;
            }

            // Fail if the token have been deleted from the database
            var tokenString = context.Request.Headers["Authorization"].ToString().Split(' ')[1];
            var token = dbContext.Tokens.FirstOrDefault(s => s.TokenValue == tokenString);
            if (token == null)
            {
                context.Fail("Invalid token: token is not recognized");
                return Task.CompletedTask;
            }

            // Fail if the user does not exist
            if (token.UserId == 0)
            {
                context.Fail("Invalid token: user does not exists");
                return Task.CompletedTask;
            }

            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<KillerBeeContext>();
    dataContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();