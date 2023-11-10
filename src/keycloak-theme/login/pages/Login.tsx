import { FormEventHandler, useState } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { Alert, Snackbar, TextField } from "@mui/material";
import Logo from "../assets/Logo";
import classNames from "classnames";
import { PageProps } from "keycloakify/login";
import { KcContext } from "keycloakify/login/kcContext";
import { I18n } from "keycloakify/login/i18n";
import { Container, TextDetail, Title } from "components";
import useBreakpoint from "hooks/use-breakpoint";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import image from "./../../../assets/login.png";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { isLg } = useBreakpoint("lg");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { kcContext } = props;

  const { url, message } = kcContext;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  return (
    <Container>
      <main className="relative lg:flex lg:h-screen col-span-full">
        <button
          className="absolute cursor-pointer top-4 left-4"
          onClick={() => {
            window.history.back();
          }}
        >
          <ChevronLeftIcon className="w-10 h-10 min-w-[40px] min-h-[40px] text-[white]" />
        </button>
        <figure className="max-h-[300px] overflow-hidden lg:max-h-screen lg:h-screen lg:overflow-auto lg:w-1/2">
          <img
            src={image}
            alt="login-background"
            className="w-full -mt-12 lg:h-full lg:mt-0"
          />
        </figure>
        <form
          id="kc-form-login"
          onSubmit={onSubmit}
          action={url.loginAction}
          method="post"
          className="lg:h-full lg:w-1/2 lg:p-14 px-7 lg:px-14"
        >
          <article className="flex items-center justify-between my-3 lg:m-0 lg:justify-end">
            <Title variant="h2" className="font-bold lg:hidden">
              Inicio de sesión
            </Title>
            <Logo />
          </article>
          <Title
            variant="h2"
            className="hidden text-center lg:block font-regular font-[300]"
          >
            Inicio de sesión
          </Title>
          <article className="flex flex-col gap-5 mt-14 lg:gap-0 lg:mt-7">
            <TextField
              variant="outlined"
              type="email"
              name="email"
              id="email"
              label="Email"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              className="w-full"
              placeholder="jessi@tuemail.com"
            />
          </article>
          <article className="flex flex-col gap-5 mt-5 lg:gap-0">
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="w-full"
              placeholder="Introduce acá tu contraseña"
            />
          </article>
          <article className="flex flex-col gap-5 mt-5">
            <button
              onClick={() => {
                window.location.href = url.loginResetCredentialsUrl;
              }}
            >
              <TextDetail size="xs" weight="regular">
                ¿Has olvidado tú contraseña?
              </TextDetail>
            </button>
            <button
              disabled={isLoginButtonDisabled || !username || !password}
              className={classNames(
                "rounded-3xl bg-primary text-center py-3 mt-5 lg:mt-0",
                {
                  "opacity-40": isLoginButtonDisabled || !username || !password,
                }
              )}
            >
              <TextDetail size="xs" weight="bold">
                Iniciar sesión
              </TextDetail>
            </button>
            <button
              onClick={() => {
                window.location.href = url.registrationUrl;
              }}
            >
              <TextDetail
                size="xs"
                weight="regular"
                className="hidden lg:block"
              >
                ¿No tienes cuenta?{" "}
                <a className="font-bold" href={url.registrationUrl}>
                  Regístrate
                </a>
              </TextDetail>
              <TextDetail size="xs" weight="regular" className="lg:hidden">
                ¿No tienes cuenta?{" "}
                <a className="font-bold" href={url.registrationUrl}>
                  Regístrate
                </a>
              </TextDetail>
            </button>
          </article>
        </form>
        {!!message && (
          <Snackbar
            open
            anchorOrigin={{
              vertical: isLg ? "bottom" : "top",
              horizontal: "right",
            }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              Inicio de sesión invalido.
            </Alert>
          </Snackbar>
        )}
      </main>
    </Container>
  );
}
