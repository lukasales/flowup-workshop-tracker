using FlowUp.Workshops.Api.DTOs.Auth;
using FlowUp.Workshops.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlowUp.Workshops.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly TokenService _tokenService;

    public AuthController(IConfiguration configuration, TokenService tokenService)
    {
        _configuration = configuration;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest request)
    {
        var username = _configuration["Auth:Username"] ?? "admin";
        var password = _configuration["Auth:Password"] ?? "admin123";

        if (string.Equals(request.Usuario, username, StringComparison.Ordinal) &&
            string.Equals(request.Senha, password, StringComparison.Ordinal))
        {
            var token = _tokenService.GenerateToken(username);
            return Ok(new LoginResponse { Token = token });
        }

        return Unauthorized();
    }
}
