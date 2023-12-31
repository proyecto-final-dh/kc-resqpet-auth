import { FormEventHandler, useState } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { TextField } from "@mui/material";
import Logo from "../assets/Logo";
import classNames from "classnames";
import { PageProps } from "keycloakify/login";
import { KcContext } from "keycloakify/login/kcContext";
import { I18n } from "keycloakify/login/i18n";
import { TextBody, TextDetail, Title } from "components";
import useBreakpoint from "hooks/use-breakpoint";

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

  console.log({ message });

  return (
    <main className="lg:flex lg:h-screen">
      <figure className="max-h-[300px] overflow-hidden lg:max-h-screen lg:h-screen lg:overflow-auto lg:w-1/2">
        <img
          src="https://s3-alpha-sig.figma.com/img/2232/b741/bcb9f70c46a50d0eea0fd93f039851c9?Expires=1699228800&Signature=JXWuifeW5Wrp5-AynB9cZO~FhnmxZm~pnoUFLOc2uXO5nEXr7l6p4-f-0rVMVJ4jFUErEpX7bnv5eNcKuflGN7Svc8MILk2wsWPD4Tn4IrpM1m~NuD9P-VW1NkNVJKGBqqXBwa5tfGOqg7W9MPHsCdwASG~OcwgtFWM8-NnBXHYcmWJMWbHSx0BRVuHdUi9wOT5IrSIn5mZvrYwr-lyQdbfgTAV4Uqn2yWXDj3QhXp6yt2cfDGdXDb20jxF5u3KoG2YjPvpYH6IZ-mBtXXwfXybe7DxU-2ptmraEOaIvYiiy7PwHGR3WvCZmUpooDki2A3-h02wTxGFNMIBb9Nu7nA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt="login-background"
          className="-mt-12 lg:h-full lg:mt-0"
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
          variant="h1"
          className="hidden text-center lg:block font-regular font-[300]"
        >
          Inicio de sesión
        </Title>
        <article className="flex flex-col gap-5 mt-14 lg:gap-0 lg:mt-7">
          <TextDetail
            size="s"
            weight={isLg ? "regular" : "bold"}
            className="lg:ml-5"
          >
            Email
          </TextDetail>
          <TextField
            variant="outlined"
            type="text"
            name="email"
            id="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            className="w-full"
            placeholder="jessi@tuemail.com"
          />
        </article>
        <article className="flex flex-col gap-5 mt-5 lg:gap-0 lg:mt-10">
          <TextDetail
            size="s"
            weight={isLg ? "regular" : "bold"}
            className="lg:ml-5"
          >
            Contraseña
          </TextDetail>
          <TextField
            variant="outlined"
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="w-full !rounded-lg"
            placeholder="Introduce acá tu contraseña"
          />
        </article>
        <article className="flex flex-col gap-5 mt-5">
          <button
            onClick={() => {
              window.location.href = url.loginResetCredentialsUrl;
            }}
          >
            <TextBody size="s" weight="regular">
              ¿Has olvidado tú contraseña?
            </TextBody>
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
            <TextDetail size="s" weight="bold">
              Iniciar sesión
            </TextDetail>
          </button>
          <button
            onClick={() => {
              window.location.href = url.registrationUrl;
            }}
          >
            <TextBody size="s" weight="regular" className="hidden lg:block">
              ¿No tienes cuenta?{" "}
              <a className="font-bold" href={url.registrationUrl}>
                Regístrate
              </a>
            </TextBody>
            <TextDetail size="xs" weight="regular" className="lg:hidden">
              ¿No tienes cuenta?{" "}
              <a className="font-bold" href={url.registrationUrl}>
                Regístrate
              </a>
            </TextDetail>
          </button>
        </article>
      </form>
    </main>
  );
}
