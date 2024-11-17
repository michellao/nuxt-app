<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DiscordAuthController extends Controller {
    const DISCORD_AUTH_URL = 'https://discord.com/api/oauth2/token';
    public function auth(Request $request) {
        $code = $request->query("code");
        if ($code) {
            $response = $this->exchangeCode($code);
            var_dump($response);
            if ($response->successful()) {
                $json = $response->json();
                $tokenType = $json['token_type'];
                $accessToken = $json['access_token'];
                $expiresIn = $json['expires_in'];
                $refreshToken = $json['refresh_token'];
                if (
                    $tokenType && $accessToken && $expiresIn && $refreshToken
                ) {
                    $user = new User;
                    $user->token_type = $tokenType;
                    $user->access_token = $accessToken;
                    $user->expire_at = now()->add($expiresIn);
                    $user->refresh_token = $refreshToken;
                    $user->save();
                }
            } else {
                return response('Failed to authenticate', 401);
            }

        } else {
            return response('Missing code', 400);
        }
    }

    public function exchangeCode(string $code): Response {
        $response = Http::withBasicAuth(config('services.discord.client_id'), config('services.discord.client_secret'))
        ->asForm()
        ->post($this::DISCORD_AUTH_URL, [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => config('app.url') . '/api/auth-discord'
        ]);
        return $response;
    }

    public function refreshToken(string $refreshToken) {

    }
}
