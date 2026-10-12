var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger UI only in dev - no reason to expose API docs in prod.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// No HTTPS redirection: Cloud Run (and docker-compose locally) terminate TLS
// in front of the container, so the app only ever sees plain HTTP on 8080.

// Matches the /health endpoint on the other services so the whole stack can be checked the same way.
app.MapGet("/health", () => new { status = "resume-data service is running" })
    .WithName("HealthCheck")
    .WithOpenApi();

app.Run();
